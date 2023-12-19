import { Router} from "express";
import { paymentController } from "../controllers/paymentController";
import protect  from '../middleware/authMiddleware'



const router = Router();


router.post("/",  paymentController.createPayment);
router.put("/:id",protect,paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);
// router.get("/",protect, paymentController.getPayments);
router.get("/", paymentController.getPaymentStatus);




export default router; 