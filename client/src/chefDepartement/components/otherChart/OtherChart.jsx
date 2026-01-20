import "./otherChart.scss";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
const OtherChart = () => {
  const id = Cookies.get("filId");

  const [profList, setProfList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/chefDepadvAll/${id}`).then((response) => {
      if (mounted) {
        setProfList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  console.log(profList);

  const data = {
    labels: profList.map((data) => data.avancement),
    datasets: [
      {
        label: "Avancements",
        data: profList.map((data) => data.num),
        backgroundColor: [
          "#0ea5e9",
          "#14b8a6",
          "#4f46e5",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };
  return (
    <div className="otherChart">
      <div className="top">
        <div className="title">
          <h3>L'avancements de tous les PFE's</h3>
        </div>
      </div>
      <div className="bottom">
        <div className="donut">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default OtherChart;
