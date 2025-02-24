const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Load environment variables from the .env file
dotenv.config();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
// const { restrictTo } = require("./middlewares/auth/restrictTo");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoute");

app.use("/users", userRoutes);

app.use("/product", productRoutes);

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
