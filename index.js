import express from "express";
const app = express();
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT;

//Database Connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/", ContactRoutes);

app.listen(PORT, () => {
  console.log(`Server Started Successfully on port, ${PORT}`);
});
