require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/dbConfig'); 

const authRoute = require('./routes/authRoute/authRoute');
const forgottenPasswordRoute = require("./routes/authRoute/ForgottenPasswordRoute")

const app = express();

app.use(cors());
app.use(express.json());

// Start the server
const PORT = 8080;

// Connect to the database
connectDB();


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/forgotten", forgottenPasswordRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
