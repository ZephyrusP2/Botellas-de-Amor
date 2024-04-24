import axios from "axios";

class UserService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listUser(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/accounts/user/list`);
  }

  createUser(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/accounts/user/create`, data);
  }

  updateUser(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`${this.server}/api/accounts/user/update/${id}`, data);
  }

  deleteUser(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/accounts/user/delete/${id}`);
  }

  showUser(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/accounts/user/show/${id}`);
  }
}

export default new UserService();
