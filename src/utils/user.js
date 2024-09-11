import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/v1/user";

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getUser`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data.data.user;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addUser = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(`${API_BASE_URL}/addUser`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location = "/";
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const release = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/release/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error(`Failed to release document: ${response.status}`);
      return null;
    }
  } catch (err) {
    console.error(`Error releasing document: ${err.message}`);
    return null;
  }
};
