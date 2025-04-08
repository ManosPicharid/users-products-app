import express from "express"
import cors from "cors"
import user from "./routes/user.routes.js"
import userProduct from "./routes/users.products.routes.js"
import auth from "./routes/auth.routes.js"
import swaggerUI from "swagger-ui-express"
import * as swaggerDocument from "./swagger.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  // origin: "*"
  origin: ["http://localhost:8000"]
}))

app.use('/api/auth', auth);
app.use("/api/users", user);
app.use("/api/user-product", userProduct);
app.use("/", express.static("files"));
app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument.options));

export default app;