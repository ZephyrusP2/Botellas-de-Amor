import axios from "axios";

class AdminService {
  server = `http://${import.meta.env.VITE_SERVER_IP}:8000`;

  login = async (userData) => {
    try {
      const response = await axios.post(
        `${this.server}/api/accounts/admin/login`,
        userData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default new AdminService();
