import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import DonutChart from "../../components/donutChart/DonutChart";
import Navbar from "../../components/navbar/Navbar";
import OtherChart from "../../components/otherChart/OtherChart";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./homeChefDep.scss";

export default function Home() {
  const id = Cookies.get("userId");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/profile/${id}`).then((response) => {
      if (mounted && response.data[0]) {
        setUserName(response.data[0].nom);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="homeChefDep">
      <Sidebar />
      <div className="homeContainerChefDep">
        <Navbar />
        <div className="contentArea">
          <div className="welcomeSection">
            <h2 className="welcomeTitle">
              Bienvenue, <span>{userName || "Chef"}</span>!
            </h2>
            <p className="welcomeSubtitle">
              Voici un aperçu de votre département aujourd'hui.
            </p>
          </div>
          <div className="widgetsChefDep">
            <Widget type="prof" />
            <Widget type="student" />
            <Widget type="pfe" />
            <Widget type="domaine" />
          </div>
          <div className="chartsChefDep">
            <DonutChart />
            <OtherChart />
          </div>
        </div>
      </div>
    </div>
  );
}
