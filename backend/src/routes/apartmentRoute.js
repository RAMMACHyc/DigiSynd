import { Router} from "express";
import { apartmentController } from "../controllers/apartmentController";

const router = Router();
router.post("/", apartmentController.createApartment);
router.get("/", apartmentController.getApartments);
router.delete("/:id", apartmentController.deleteApartment);
router.put("/:id", apartmentController.updateApartment);



export default router;