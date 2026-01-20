import "./donutChart.scss";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";

const DonutChart = () => {
  const id = Cookies.get("userId");

  const [profList, setProfList] = useState([]);
  //grab data from the DB & display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/chefDepadv/${id}`).then((response) => {
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
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#06b6d4",
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
    <div className="donutChart">
      <div className="top">
        <div className="title">
          <PieChartIcon className="cardIcon" />
          <h3>Mes PFE's - Avancement</h3>
        </div>
        <Link to="/chefdepartement/myPfe" className="viewAllBtn">
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

export default DonutChart;
