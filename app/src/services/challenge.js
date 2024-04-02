import axios from "axios";

class ChallengeService {
  server = `http://${process.env.SERVER_IP}:8000`;

  getChallengeList = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/disposal/challenge/list`
      );
      return response.data; 
    } catch (error) {
      console.error("getChallengeList error", error);
      throw error;
    }
  };
}

export default new ChallengeService();
