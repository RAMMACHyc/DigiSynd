
import { Router} from "express";
import  {registerSyndic, loginUser}  from "../controllers/authController";
const routerUser = Router();
// const { protect } = require('../middleware/authMiddleware').default
routerUser.post('/signup', registerSyndic);
routerUser.post('/signin', loginUser)


export default routerUser;
 