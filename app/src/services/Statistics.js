import axios from "axios";

class StatisticsService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  getTotalBottlesContributed(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/total_bottles_contributed`);
  }

  getPlasticFootprintReduced(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/plastic_footprint_reduced`);
  }

  getTotalUsers(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/total_users`);
  }

  getMostContributedBottlesByGender(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(
      `${this.server}/api/statistics/most_contributed_bottles_by_gender`
    );
  }

  getTop5Sites(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/top_5_sites`);
  }

  getTop5Users(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/top_5_users`);
  }

  getTotalKilosContributed(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/total_kilos_contributed`);
  }

  getAverageAge(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/statistics/average_age`);
  }

  getProjectedBottlesContribution(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(
      `${this.server}/api/statistics/projected_bottles_contribution`
    );
  }
}

export default new StatisticsService();
