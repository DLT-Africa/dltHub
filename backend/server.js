require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./config/DBconnect");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ideaRoutes = require("./routes/ideasRoute");
const newsLetterRoutes = require("./routes/newsLetterRoute");
const projectRoutes = require("./routes/projectRoutes");
const mongoose = require("mongoose");

const app = express();

const allowedOrigins = [
  "*",
  "http://localhost:3000",
  "https://dlt-africa-talent-pool.vercel.app",
  "https://dltafrica.io",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      if (!origin) return callback(null, true);
      // Check if the origin is in the list of allowed origins
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/idea", ideaRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/newsLetter", newsLetterRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 6000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});