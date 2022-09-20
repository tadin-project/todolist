import axios from "axios";

const baseURL = "";

export const client = ({ token = "" }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
