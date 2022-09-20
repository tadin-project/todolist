import axios from "axios";

const baseURL = "http://localhost:3001";

export const client = (data = { token: "" }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
