import axios from "axios";

if (process.env.NODE_ENV == "production") {
  let domain = window.location.origin;
  if (domain.includes("88")) {
    axios.defaults.baseURL = domain.replace(":88", "/") + "epab/server.php/api";
  } else {
    axios.defaults.baseURL = domain + "/epab/server.php/api";
  }
} else {
  axios.defaults.baseURL = "http://localhost:8000/api";
  // axios.defaults.baseURL = "http://serverweb/epab/server.php/api"
}

export default axios.create({
  headers: {
    "Content-type": "application/json",
  },
});
