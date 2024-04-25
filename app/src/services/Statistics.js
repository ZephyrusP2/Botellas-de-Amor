import axios from "axios";

class StatisticsService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  getTotalBottlesContributed(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/total_bottles_contributed`);
  }

  getPlasticFootprintReduced(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/plastic_footprint_reduced`);
  }

  getTotalUsers(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/total_users`);
  }

  getMostContributedBottlesByGender(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(
      `${this.server}/api/disposal/statistics/most_contributed_bottles_by_gender`
    );
  }

  getTop5Sites(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/top_5_sites`);
  }

  getTop5Users(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/top_5_users`);
  }

  getTotalKilosContributed(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/total_kilos_contributed`);
  }

  getAverageAge(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/statistics/average_age`);
  }

  getProjectedBottlesContribution(token, month) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(
      `${this.server}/api/disposal/statistics/projected_bottles_contribution/${month}`
    );
  }
}

export default new StatisticsService();
