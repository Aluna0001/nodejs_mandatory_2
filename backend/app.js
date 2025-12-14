import express from "express";
import path from "path";
import session from "express-session";
import authRoutes from "./routers/authRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static("../frontend/dist"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(authRoutes);

app.get("/", (req, res) => {
  res.send({ data: "hello" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
