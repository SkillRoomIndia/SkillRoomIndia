const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// ROUTES
const userRoutes = require("./routes/userRoutes");
const forgotUserRoutes = require("./routes/forgotUserRoutes");
const clientRoutes = require("./routes/clientRoute");
const forgotClientRoutes = require("./routes/forgotClientRoutes");
const partnershipRoutes = require("./routes/partnershipRoutes");
const callbackRoutes = require("./routes/callbackRoutes");
const businessPartnershipRoutes = require("./routes/businessPartnershipRoutes");
const cvSubmissionRoutes = require("./routes/cvSubmissionRoutes");

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://your-render-service.onrender.com"], // Replace with actual Render URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API ROUTES
app.use("/users", userRoutes);
app.use("/users/forgot", forgotUserRoutes);
app.use("/business", clientRoutes);
app.use("/business/forgot", forgotClientRoutes);
app.use("/partnership", partnershipRoutes);
app.use("/callback", callbackRoutes);
app.use("/business-partnership", businessPartnershipRoutes);
app.use("/cv-submission", cvSubmissionRoutes);

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

// ERROR HANDLERS
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message, err.stack);
});
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message, err.stack);
});

// START SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});


