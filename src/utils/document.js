import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/v1/document";

export const getDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Fetching documents failed:",
      error.response ? error.response.data : error.message,
    );
    return error.response ? error.response.data : error.message;
  }
};

export const addDocument = async (formData) => {
  try {
    await axios.post(`${API_BASE_URL}/addDocument`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    window.location.reload();
  } catch (error) {
    console.error(
      "Adding document failed:",
      error.response ? error.response.data : error.message,
    );
    return error.response ? error.response.data : error.message;
  }
};

export const editDocument = async (id, formData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/editDocument/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Editing document failed:",
      error.response ? error.response.data : error.message,
    );
    return error.response ? error.response.data : error.message;
  }
};

export const deleteDocument = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteDocument/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  } catch (error) {
    console.error(
      "Deleting document failed:",
      error.response ? error.response.data : error.message,
    );
    return error.response ? error.response.data : error.message;
  }
};
