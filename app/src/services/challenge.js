import axios from "axios";

class ChallengeService {
  server = `http://${process.env.SERVER_IP}:8000`;

  list = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/disposal/challenge/list`,
      );
      return response;
    } catch (error) {
      console.error("list error", error);
      throw error;
    }
  };

  toggle = async (token, challengeData) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.post(
        `${this.server}/api/disposal/challenge/toggle`,
        challengeData,
      );
      return response;
    } catch (error) {
      console.error("toggle error", error);
      throw error;
    }
  };
}

export default new ChallengeService();
