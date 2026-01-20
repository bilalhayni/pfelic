import "./otherChart.scss";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

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

  const data = {
    labels: profList.map((data) => data.avancement),
    datasets: [
      {
        label: "Avancements",
        data: profList.map((data) => data.num),
        backgroundColor: [
          "#06b6d4",
          "#10b981",
          "#3b82f6",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 16,
          usePointStyle: true,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    cutout: "65%",
    maintainAspectRatio: true,
  };

  return (
    <div className="otherChart">
      <div className="top">
        <div className="title">
          <DonutLargeIcon className="cardIcon" />
          <h3>Tous les PFE's - Avancement</h3>
        </div>
        <Link to="/chefdepartement/pfe" className="viewAllBtn">
          Voir tous
        </Link>
      </div>
      <div className="bottom">
        <div className="donut">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OtherChart;
