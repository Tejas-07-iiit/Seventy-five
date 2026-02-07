const express = require("express")
const connect = require("./config/db")
const app = express();
const cors = require("cors");

// Cross origin
app.use(cors({
    origin: "http://localhost:3000", 
  credentials: true
}));

require("dotenv").config();

// Body Access
app.use(express.json())

// connect With MongoDb
connect();

// Routes

// For Login
app.use("/api/" , require("./routes/login"))

// For Register
app.use("/api/", require("./routes/Register"))

// For Refresh
app.use("/api/" , require("./routes/Refresh"))

// For Add Subject and Attendance initialize
app.use("/api/" , require("./routes/AddSubject"))

// For Update Attendance 
app.use("/api/",  require("./routes/Attendance"))

// For Fetching All Subjects
app.use("/api/",require("./routes/Allsubject"))

// Delete Subject 
app.use("/api/" , require("./routes/DeleteSubejct"))

// For Fetching All Attendance
app.use("/api/" , require("./routes/Allattendance"))

// Edit initial Attendance
app.use("/api/" , require("./routes/EditAttendance"))

app.listen(5000,"0.0.0.0" , ()=> {
  console.log("Your Server is running on port  : " , process.env.PORT)
})