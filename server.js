const express = require("express");
const cors = require("cors");
const axios = require('axios');
const bodyParser = require("body-parser");


//fjfjkf
const app = express();
app.use(express.json());
const port = process.env.PORT || 8082;
const config = {
  origin: "https://urilinks.com",
  methods: "POST, GET",
};
app.use(cors(config));

app.use((req, res, next) => {
  console.log("req.originalUrl=" + req.originalUrl);
  //dklsklkd
  //if (req.originalUrl === "/api/v1/webhook/stripe") {
  //if (req.originalUrl === "/webhook") {
  if (req.originalUrl === "/") {
    next(); // Skip body parsing for Stripe
  } else {
    express.json()(req, res, next);
  }
});

app.use(bodyParser.json());


app.get("/", (req, res) => {
  async function convertRSSToJSON(rssURL) {
  const apiURL = "https://api.apyhub.com/convert/rss-url/json?detailed=true";
  const requestData = { url: rssURL };
  const options = {
    method: "POST",
    url: apiURL,
    headers: {
      "Content-Type": "application/json",
      "apy-token": "APY0hVYCmwgWbHhNIpvFZ2hjHQIYEnWJx32MrM3Cn40u4y0Upq9NGH2FPKFP3kP5GQdyYrgbPlKWqf" // Replace with your actual token
    },
    data: requestData
  };

  try {
    const response = await axios.request(options);
    console.log("RSS to JSON conversion successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
}

convertRSSToJSON("https://www.espn.com/espn/rss/nfl/news")

 res.status(200).send("get response: " + "hello");
});

app.post("/", (req, res) => {
 
      res.status(200).send("post response: " + "hello");
    
});

app.listen(port, () => {
  console.log("Server running on port 8082");
});
