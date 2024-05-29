import React, { useEffect, useState } from "react";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import StatisticService from "../../../services/statistic";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import "../../../styles/Forms.css";

function IndexAnalisis() {
  document.title = "Análisis";

  const [topSitesData, setTopsitesData] = useState([]);
  const [topUsersData, setTopusersData] = useState([]);
  const [
    mostContributedBottlesByGenderData,
    setMostContributedBottlesByGenderData,
  ] = useState([]);
  const [totalBottlesContributed, setTotalBottlesContributed] = useState(0);
  const [averageFootprintReduced, setAverageFootprintReduced] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalKilosContributed, setTotalKilosContributed] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  useEffect(() => {
    const getTop5Sites = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getTop5Sites(token);
      setTopsitesData(response.data);
    };
    const getTop5Users = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getTop5Users(token);
      setTopusersData(response.data);
    };
    const getMostContributedBottlesByGender = async () => {
      const token = localStorage.getItem("token");
      const response =
        await StatisticService.getMostContributedBottlesByGender(token);
      setMostContributedBottlesByGenderData([
        { label: "Masculino", value: response.data[0]["men"] },
        { label: "Femenino", value: response.data[0]["women"] },
      ]);
    };
    const getTotalBottlesContributed = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getTotalBottlesContributed(token);
      setTotalBottlesContributed(response.data["total_bottles"]);
    };
    const getAverageFootprintReduced = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getAverageFootprintReduced(token);
      setAverageFootprintReduced(response.data["plastic_footprint_average"]);
    };
    const getTotalUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getTotalUsers(token);
      setTotalUsers(response.data["total_users"]);
    };
    const getTotalKilosContributed = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getTotalKilosContributed(token);
      setTotalKilosContributed(response.data["total_kilos"]);
    };
    const getAverageAge = async () => {
      const token = localStorage.getItem("token");
      const response = await StatisticService.getAverageAge(token);
      setAverageAge(response.data["average_age"]);
    };

    getAverageAge();
    getTotalKilosContributed();
    getTotalUsers();
    getAverageFootprintReduced();
    getTotalBottlesContributed();
    getMostContributedBottlesByGender();
    getTop5Sites();
    getTop5Users();
  }, []);

  const valueFormatter = (value) => {
    return `${value} botellas`;
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-2 my-2">
          <div className="col">
            <div className="card h-100 d-flex flex-column justify-content-between blue-border card-dashboard">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Top 5 puntos de acopio
              </div>
              <div className="card-body p-0">
                <BarChart
                  dataset={topSitesData}
                  yAxis={[
                    {
                      scaleType: "band",
                      dataKey: "site",
                      tickLabelStyle: { fontSize: 0 },
                    },
                  ]}
                  series={[
                    {
                      dataKey: "bottles",
                      label: "Botellas",
                      color: "#00c8ea",

                      valueFormatter,
                    },
                  ]}
                  layout="horizontal"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 d-flex flex-column justify-content-between blue-border card-dashboard">
              <div className="card-header text-center bg-myPrimary text-white blue-border">
                Top 5 usuarios
              </div>
              <div className="card-body p-0">
                <BarChart
                  dataset={topUsersData}
                  yAxis={[
                    {
                      scaleType: "band",
                      dataKey: "user",
                      tickLabelStyle: { fontSize: 0 },
                    },
                  ]}
                  series={[
                    {
                      dataKey: "bottles",
                      label: "Botellas",
                      color: "#00c8ea",

                      valueFormatter,
                    },
                  ]}
                  layout="horizontal"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-2 my-2">
          <div className="col-sm-4">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Total de botellas recicladas
              </div>
              <div className="card-body">
                <h5 className="card-title text-center mb-3 display-3">
                  {totalBottlesContributed}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Promedio de huella plastica reducida
              </div>
              <div className="card-body">
                <h5 className="card-title text-center mb-3 display-3">
                  {averageFootprintReduced} Kg
                </h5>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Total de usuarios
              </div>
              <div className="card-body">
                <h5 className="card-title text-center mb-3 display-3">
                  {totalUsers}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-2 my-2">
          <div className="col">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Total de kilos reciclados
              </div>
              <div className="card-body">
                <h5 className="card-title text-center mb-3 display-3">
                  {totalKilosContributed} Kg
                </h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Botellas por género
              </div>
              <div className="card-body">
                <PieChart
                  series={[
                    {
                      data: mostContributedBottlesByGenderData,
                      innerRadius: 30,
                      outerRadius: 40,
                    },
                  ]}
                  colors={["#ff6f61", "#00c8ea"]}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 d-flex flex-column justify-content-between card-dashboard blue-border">
              <div className="card-header text-center bg-myPrimary white-text blue-border">
                Edad promedio
              </div>
              <div className="card-body">
                <h5 className="card-title text-center mb-3 display-3">
                  {averageAge}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexAnalisis;
