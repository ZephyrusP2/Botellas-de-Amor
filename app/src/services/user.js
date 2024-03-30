import axios from "axios";

class UserService {
  server = `http://${process.env.SERVER_IP}:8000`;

  login = async (userData) => {
    try {
      const response = await axios.post(
        `${this.server}/api/accounts/user/login`,
        userData
      );
      return response;
    } catch (error) {
      console.error("login error", error);
      throw error;
    }
  };

  register = async (userData) => {
    try {
      const response = await axios.post(
        `${this.server}/api/accounts/user/register`,
        userData
      );
      return response;
    } catch (error) {
      console.error("register error", error);
      throw error;
    }
  };

  getCarbonFootprint = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.post(
        `${this.server}/api/user/carbon-footprint`
      );
      return response;
    } catch (error) {
      console.error("getCarbonFootprint error", error);
      throw error;
    }
  };
}

export default new UserService();
