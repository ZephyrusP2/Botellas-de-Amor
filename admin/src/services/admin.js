import axios from "axios";

class AdminService {
  server = `http://${process.env.SERVER_IP}:8000`;

  login = async (userData) => {
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