import express from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://iamus4ma:iamus4ma@mern-estate.znrq6s5.mongodb.net/mern-estate?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
