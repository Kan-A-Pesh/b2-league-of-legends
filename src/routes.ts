import express from "express";
import championsRoutes from "./routes/championsRoutes";
import usersRoutes from "./routes/usersRoutes";

const router = express.Router();

router.use("/champions", championsRoutes);
router.use("/users", usersRoutes);

export default router;
