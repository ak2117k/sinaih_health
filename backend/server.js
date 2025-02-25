const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path=require("path")
// Load environment variables from the .env file
dotenv.config();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
// const { restrictTo } = require("./middlewares/auth/restrictTo");

const app = express();
app.use(
  cors({
    origin: true, // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./api/UserRoutes");
const productRoutes = require("./api/ProductRoute");

app.use("/api/users", userRoutes);

app.use("/api/product", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting the server:", err);
        return;
      }
      console.log(`Server is running at 3000 ${PORT}`);
    });
  })
  .catch((error) => console.log("error connecting db", error));
