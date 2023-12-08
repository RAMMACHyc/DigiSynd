import { Router} from "express";
import { paymentController } from "../controllers/paymentController";

const router = Router();
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);



export default router;