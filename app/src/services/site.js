import axios from "axios";

class SiteService {
  server = `http://${process.env.SERVER_IP}:8000`;

  listSite = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(`${this.server}/api/site/list`);
      return response;
    } catch (error) {
      console.error("listSite error", error);
      throw error;
    }
  };
}
