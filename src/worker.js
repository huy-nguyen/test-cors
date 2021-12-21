/* eslint-disable no-restricted-globals */
import axiosImport from "axios";

// Show main thread that worker is up and running:
self.onmessage = ({ data: { question } }) => {
  self.postMessage({
    answer: "Yes worker is up and running.",
  });
};

// Perform worker thread fetch test:
const axios = axiosImport.create({
  baseURL: "https://goat.niaid.nih.gov/hedwig/api/",
  headers: {
    Authorization: "Bearer invalid-token-worker",
  },
});
const testFetch = async () => {
  try {
    // const dummyAuthResponse = await axios.get("/auth/dummy/huy")
    // console.log("worker auth response", dummyAuthResponse)

    const projectsResponse = await axios.get("/projects");
    console.log("woroker projectResponse", projectsResponse);
  } catch (error) {
    console.log("start: error in worker");
    console.log("error", error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("response.data", error.response.data);
      console.log("response.status", error.response.status);
      console.log("responspe.headers", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("request", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Some other error");
    }
    console.log("end: error in worker");
  }
};

/* eslint-disable no-unused-expressions */
testFetch();
