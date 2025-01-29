require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/dbConfig'); 

const authRoute = require('./routes/authRoute/authRoute');
const forgottenPasswordRoute = require("./routes/authRoute/ForgottenPasswordRoute")
const courseRoute = require("./routes/courseRoute/courseRoute")
const courseEnrollRoute = require("./routes/courseEnrollRoute/courseEnrollRoute")
const adminRoute = require("./routes/adminRoute/adminRoute")
const courseRecommendationRoute = require("./routes/courseRecommendationRoute/courseRecommendationRoute")

const app = express();

app.use(cors());
app.use(express.json());

// Start the server
const PORT = 4000;

// Connect to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/forgotten", forgottenPasswordRoute);
app.use("/api/v1/courses",courseRoute)
app.use("/api/v1/enroll-courses",courseEnrollRoute)
app.use("/api/v1/admin",adminRoute)
app.use("/api/v1/recommendation",courseRecommendationRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("Server is running on port 4000")
