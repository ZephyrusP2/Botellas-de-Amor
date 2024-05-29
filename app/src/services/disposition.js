import axios from "axios";

class DispositionService {
  server = `http://${process.env.SERVER_IP}:8000`;

  create = async (token, data) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.post(
        `${this.server}/api/disposal/disposition/create`,
        data,
      );
      return response;
    } catch (error) {
      console.error("create error", error);
      throw error;
    }
  };
}

export default new DispositionService();
