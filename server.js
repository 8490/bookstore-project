const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./models/connectDB");
const router = require("./routes/router");

connectDB();

app.use(express.json());
app.use("/api", router);


// production heroku 
if (process.env.NODE.ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}


app.listen(process.env.PORT, () => {
  console.log(`I'm listening on port ${process.env.PORT}`);
});
