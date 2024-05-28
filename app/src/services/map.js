import axios from "axios";

class MapService {
  server = `http://${process.env.SERVER_IP}:8000`;

  retrieve = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/disposal/site/list`,
      );
      return response;
    } catch (error) {
      console.error("retrieve error", error);
      throw error;
    }
  };
}

export default new MapService();
