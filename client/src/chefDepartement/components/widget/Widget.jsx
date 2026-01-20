import "./widgetChefDep.scss";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Widget = ({ type }) => {
  let data;
  const id = Cookies.get("filId");

  //fetch the number of prof's in filiere
  const [numProf, setNumProf] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numProfChedDep/${id}`).then((response) => {
      if (mounted) {
        setNumProf(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  //fetch the number of prof's in filiere
  const [numStd, setNumStd] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numStdChedDep/${id}`).then((response) => {
      if (mounted) {
        setNumStd(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  //fetch the number of pfe's in filiere
  const [numPfe, setNumPfe] = useState("");
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/numPfe/${id}`).then((response) => {
      if (mounted) {
        setNumPfe(response.data[0].num);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

    //fetch the number of pfe's in filiere
    const [numDom, setNumDom] = useState("");
    useEffect(() => {
      let mounted = true;
      Axios.get(`http://localhost:3001/numDomaines/${id}`).then((response) => {
        if (mounted) {
          setNumDom(response.data[0].num);
        }
      });
      return () => {
        mounted = false;
      };
    }, [id]);

  switch (type) {
    case "prof":
      data = {
        title: "Professeurs",
        description: "Membres actifs",
        link: "Voir tous",
        go: "/chefdepartement/prof",
        number: numProf,
        icon: (
          <SchoolIcon
            className="icon"
            style={{
              color: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
            }}
          />
        ),
      };
      break;
    case "student":
      data = {
        title: "Étudiants",
        description: "Inscrits en PFE",
        link: "Voir tous",
        go: "/chefdepartement/student",
        number: numStd,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              color: "#f59e0b",
            }}
          />
        ),
      };
      break;
    case "pfe":
      data = {
        title: "Projets PFE",
        description: "Actifs & terminés",
        link: "Voir tous",
        go: "/chefdepartement/pfe",
        number: numPfe,
        icon: (
          <BusinessCenterIcon
            className="icon"
            style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}
          />
        ),
      };
      break;
    case "domaine":
      data = {
        title: "Domaines",
        description: "Spécialités PFE",
        link: "Voir tous",
        go: "/chefdepartement/domaine",
        number: numDom,
        icon: (
          <DomainIcon
            className="icon"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              color: "#8b5cf6",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widgetChefDep">
      <div className="rightWidgetChefDep">
        <span className="titleChefDepWidget">{data.title}</span>
        {data.icon}
      </div>
      <div className="leftWidgetChefDep">
        <span className="counterChefDep">{data.number}</span>
        <span className="linkChefDep">{data.description}</span>
      </div>
    </div>
  );
};

export default Widget;
