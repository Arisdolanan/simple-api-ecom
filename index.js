const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT_APP;
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
  createParentPath: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger.json");

const loginRouter = require("./routes/login_route");
const usersRouter = require("./routes/mst_users_route");
const roleRouter = require("./routes/mst_role_route");
const categoriesRouter = require("./routes/categories_route");
const productsRouter = require("./routes/products_route");
const ordersRouter = require("./routes/orders_route");

app.use(
  "/api/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);

app.get("/", function (req, res) {
  res.send("respond with a resource");
});
