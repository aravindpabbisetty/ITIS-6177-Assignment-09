const express = require("express");
const axios = require('axios');

const app = express();
const PORT = 3002;

app.get("/", (req,res) => {
  res.send("Please use '/say' at the end of url with a keyword as query parameter to use the aws function");
});

app.get("/say", async (req,res) => {
  let queryData = req.query.keyword;
  try {
    const response = await axios.get(`https://cnqfhwahuwzjvknva4nfxv7ytm0dmkdg.lambda-url.us-east-1.on.aws`, {
      params: {
        keyword: queryData
      }}
    );
    if(response) {
      res.send(response.data.queryStringParameters.keyword);
    } else {
      res.send("Error executing AWS lambda function");
    }
  } catch (err) {  
    console.error(err);
  }
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully running,and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
