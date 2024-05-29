import axios from "axios";

class UserService {
  server = `http://${process.env.SERVER_IP}:8000`;

  login = async (userData) => {
    try {
      const response = await axios.post(
        `${this.server}/api/accounts/user/login`,
        userData,
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
        userData,
      );
      return response;
    } catch (error) {
      console.error("register error", error);
      throw error;
    }
  };

  retrieve = async (token, id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/accounts/user/show/${id}`,
      );
      return response;
    } catch (error) {
      console.error("retrieve error", error);
      throw error;
    }
  };

  delete = async (token, id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.delete(
        `${this.server}/api/accounts/user/delete/${id}`,
      );
      return response;
    } catch (error) {
      console.error("delete error", error);
      throw error;
    }
  };

  update = async (token, id, userData) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.put(
        `${this.server}/api/accounts/user/update/${id}`,
        userData,
      );
      return response;
    } catch (error) {
      console.error("update error", error);
      throw error;
    }
  };

  bottles = async (token, id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await axios.get(
        `${this.server}/api/accounts/user/bottles`,
      );
      return response;
    } catch (error) {
      console.error("bottles error", error);
      throw error;
    }
  };
}

export default new UserService();
