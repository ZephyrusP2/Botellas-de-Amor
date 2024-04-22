import axios from "axios";

class projectService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listProject(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    console.log(this.server);
    return axios.get(`${this.server}/api/information/project/list`);
  }

  createProject(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/information/project/create`, data);
  }

  updateProject(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(
      `${this.server}/api/information/project/update/${id}`,
      data,
    );
  }

  deleteProject(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/information/project/delete/${id}`);
  }

  showProject(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/information/project/show/${id}`);
  }
}

export default new projectService();
