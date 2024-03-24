import axios from "axios";

const apiKeys = {
  newsApiKey: "5a48b7a3d9574adfa07b054ae40c0202",
  nyTimesKey: "vr4V2sAoCZQ3Y8vQjVFkVaNUamvsmiwG",
  guardianKey: "84719cfd-d72d-4e51-a91a-2b84bd211577"
};

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

const nyTimesApi = axios.create({
  baseURL: "https://api.nytimes.com/svc",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

const guardianApi = axios.create({
  baseURL: "https://content.guardianapis.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

newsApi.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apiKey: apiKeys.newsApiKey
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

nyTimesApi.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      "api-key": apiKeys.nyTimesKey
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

guardianApi.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      "api-key": apiKeys.guardianKey
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { newsApi, nyTimesApi, guardianApi };
