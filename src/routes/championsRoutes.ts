import express from "express";
import ChampionsController from "../controllers/championsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, ChampionsController.create);
router.get("/", ChampionsController.getAll);
router.get("/:id", ChampionsController.getOne);
router.put("/:id", authMiddleware, ChampionsController.update);
router.delete("/:id", authMiddleware, ChampionsController.delete);

export default router;
