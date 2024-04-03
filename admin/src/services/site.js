import axios from "axios";

class siteService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listSite(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    console.log(this.server);
    return axios.get(`${this.server}/api/disposal/site/list`);
  }

  createSite(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/disposal/site/create`, data);
  }

  updateSite(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`${this.server}/api/disposal/site/update/${id}`, data);
  }

  deleteSite(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/disposal/site/delete/${id}`);
  }

  showSite(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/site/show/${id}`);
  }
}

export default new siteService();
