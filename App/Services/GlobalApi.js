import axios from "axios";

const BASE_URL = "http://192.168.43.95:3000/api/bardapi";

const getBardApi = (userMsg) => axios(BASE_URL + "?ques=" + userMsg);

export default {
  getBardApi,
};
