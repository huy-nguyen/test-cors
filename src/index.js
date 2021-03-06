import axiosImport from "axios";

// Show somthing in the DOM to show app is ready:
const div = document.createElement("h1");
div.textContent = "Hello World";
document.body.appendChild(div);

// Load worker for testing:
const worker = new Worker(new URL("./worker.js", import.meta.url));
worker.postMessage({
  question: "Is worker up and running?",
});
worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};

// Perform main thread fetch test:
const axios = axiosImport.create({
  baseURL: "https://goat.niaid.nih.gov/hedwig/api/",
  headers: {
    Authorization: "Bearer invalid-token-main-thread",
  },
});
const testFetch = async () => {
  try {
    // const dummyAuthResponse = await axios.get("/auth/dummy/huy")
    // console.log("main thread auth response", dummyAuthResponse)

    const projectsResponse = await axios.get("/projects");
    console.log("main thread projectResponse", projectsResponse);
  } catch (error) {
    console.log("start: error in main thread");
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
    console.log("end: error in main thread");
  }
};

/* eslint-disable no-unused-expressions */
testFetch()
