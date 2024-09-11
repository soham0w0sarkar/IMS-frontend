import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/v1";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location = "/";
    }
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error(
      "Logout failed:",
      error.response ? error.response.data : error.message,
    );
    throw new Error(
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/forgotPassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error) {
    console.error(
      "Forgot password request failed:",
      error.response ? error.response.data : error.message,
    );
    throw new Error(
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/resetPassword`,
      { newPassword, token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      window.location.href = "/login";
      return response.data.message;
    }
  } catch (error) {
    console.error(
      "Reset password request failed:",
      error.response ? error.response.data : error.message,
    );
    throw new Error(
      error.response ? error.response.data.message : error.message,
    );
  }
};
