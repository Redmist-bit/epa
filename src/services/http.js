import axios from "axios";

if (process.env.NODE_ENV == "production") {
  let domain = window.location.origin;
  if (domain.includes("8008")) {
    axios.defaults.baseURL =
      domain.replace(":8008", "/") + "erp/server.php/api";
  } else {
    axios.defaults.baseURL = domain + "/erp/server.php/api";
  }
} else {
  axios.defaults.baseURL = "http://localhost:8000/api";
}

export default axios.create({
  headers: {
    "Content-type": "application/json",
  },
});
