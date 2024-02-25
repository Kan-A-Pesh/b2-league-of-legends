import "dotenv/config";
import express from "express";
import routes from "./src/routes";

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static("public"));

// API Routes
app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});
