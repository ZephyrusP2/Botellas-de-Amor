import axios from "axios";

class dispositionService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listDisposition(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    console.log(this.server);
    return axios.get(`${this.server}/api/disposal/disposition/list`);
  }

  createDisposition(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/disposal/disposition/create`, data);
  }

  updateDisposition(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`${this.server}/api/disposal/disposition/update/${id}`, data);
  }

  deleteDisposition(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/disposal/disposition/delete/${id}`);
  }

  showDisposition(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/disposition/show/${id}`);
  }

}

export default new dispositionService();