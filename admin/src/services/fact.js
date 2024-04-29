import axios from "axios";

class factService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listFact(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/information/fact/list`);
  }

  createFact(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/information/fact/create`, data);
  }

  updateFact(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(
      `${this.server}/api/information/fact/update/${id}`,
      data
    );
  }

  deleteFact(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/information/fact/delete/${id}`);
  }

  showFact(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/information/fact/show/${id}`);
  }
}

export default new factService();
