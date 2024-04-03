import axios from "axios";

class challengeService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  listChallenge(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    console.log(this.server);
    return axios.get(`${this.server}/api/disposal/challenge/list`);
  }

  createChallenge(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(`${this.server}/api/disposal/challenge/create`, data);
  }

  updateChallenge = async (id, data, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(
      `${this.server}/api/disposal/challenge/update/${id}`,
      data,
    );
  };

  deleteChallenge(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`${this.server}/api/disposal/challenge/delete/${id}`);
  }

  showChallenge(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(`${this.server}/api/disposal/challenge/show/${id}`);
  }
}

export default new challengeService();
