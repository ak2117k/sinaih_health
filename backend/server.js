const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from the .env file
dotenv.config();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
// const { restrictTo } = require("./middlewares/auth/restrictTo");

const paypal = require("@paypal/paypal-server-sdk");

const {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} = paypal;

// app.use(cors({ origin: "https://www.sinai-health.com", credentials: true }));

const app = express();
app.use(cors({ origin: "https://www.sinai-health.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: "Production",
  logging: {
    logLevel: LogLevel.Debug,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

// console.log(client);

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
// value: String(cart.price),

const createOrder = async (cart) => {
  console.log("Entering create order");
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "CAD",
            value: "1",
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  console.log("create order collect", collect);

  try {
    const response = await ordersController.ordersCreate(collect);
    console.log(response);
    if (!response || !response.body) {
      throw new Error("Invalid response from paypal");
    }
    console.log(response);
    const { body, ...httpResponse } = response;
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    console.log("body of create order", JSON.parse(body));
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    console.log("goes to catch block", error);
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      console.error("PayPal API Error Status:", error.statusCode);
      console.error("PayPal API Error Headers:", error.headers);
      throw new Error(error.message, error);
    }
    throw new Error("Error creating PayPal order: " + error);
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const response = await ordersController.ordersCapture(collect);
    if (!response || !response.body) {
      throw new Error("Invalid response from paypal");
    }

    // Get more response info...
    // const { statusCode, headers } = httpResponse;

    const { body, ...httpResponse } = response;

    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { product } = req.body;
    console.log(product);
    const { jsonResponse, httpStatusCode } = await createOrder(product);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

const userRoutes = require("./api/UserRoutes");
const productRoutes = require("./api/ProductRoute");
const BuyNowRoutes = require("./api/BuyNowBookingRoute");
const adminRoutes = require("./api/AdminRoute");

app.use("/api/users", userRoutes);

app.use("/api/product", productRoutes);

app.use("/api/buynow", BuyNowRoutes);

app.use("/api/admin", adminRoutes);

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
