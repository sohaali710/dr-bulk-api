var express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const multer = require("multer");
const cors = require("cors");
var app = express();

const { dbConnection } = require("./db/mongoose");
const ApiError = require("./utils/ApiError");
const globalErrorHandling = require("./middlewares/errorHandlingMiddleware");
const upload = require("./middlewares/fileUpload");

const adminRoute = require("./routes/adminRoute");
const editorRoute = require("./routes/editorRoute");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/order");
const instructorRoute = require("./routes/instructorRoute");
const membershipRoute = require("./routes/membership");
const bookMembershipRoute = require("./routes/bookMembership");
const eatSmartRoute = require("./routes/eatSmart");
const bookEatSmartRoute = require("./routes/bookEatSmart");
const aboutRoute = require("./routes/aboutRoute");
const swaggerDocs = require("./utils/swagger");

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.static("public")); //to mention express that the frontend (static files) are in public folder
app.use(cors());

// Connect with database
dbConnection();

// file upload
app.post("/api/products", upload.any("images"), (err, req, res, next) => {}); // add product
app.post("/api/products/add-img/:id", upload.array("images")); // add img
app.post("/api/instructors/", upload.single("image")); // add
app.put("/api/instructors/:id", upload.single("image")); // update

// Mount Routes
app.use("/api/admins", adminRoute);
app.use("/api/editors", editorRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/instructors", instructorRoute);
app.use("/api/memberships", membershipRoute);
app.use("/api/book-membership", bookMembershipRoute);
app.use("/api/eat-smart", eatSmartRoute);
app.use("/api/book-eat-smart", bookEatSmartRoute);
app.use("/api/about", aboutRoute);

swaggerDocs(app, PORT);

app.all("*", (req, res, next) => {
  next(new ApiError(400, `Can't find this route: ${req.originalUrl}`));
});

// Global error handling middleware
app.use(globalErrorHandling);

const server = app.listen(PORT, () =>
  console.log("Server runs on : http://localhost:" + PORT)
);

// handle rejections outside express (ex. dbConnection error)
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection error: ${err}`);
  server.close(() => {
    console.error(`Shutting down.....`);
    process.exit(1);
  });
});
