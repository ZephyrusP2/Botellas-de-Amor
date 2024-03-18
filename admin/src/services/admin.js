import axios from "axios";

class AdminService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  login = async (userData) => {
    console.log(this.server);
    try {
      const response = await axios.post(
        `${this.server}/api/accounts/admin/login`,
        userData,
      );
      return response;
    } catch (error) {
      console.error("login error", error);
      throw error;
    }
  }; 
}

export default new AdminService();