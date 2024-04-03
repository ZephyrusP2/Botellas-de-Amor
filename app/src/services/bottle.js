import axios from "axios";

class BottleService {
  server = `http://${process.env.SERVER_IP}:8000`;

  retrieve = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/disposal/bottle/retrieve`
      );
      return response;
    } catch (error) {
      console.error("retrieve error", error);
      throw error;
    }
  };
}

export default new BottleService();
