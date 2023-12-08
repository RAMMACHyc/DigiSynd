import "./config"
import express from "express";
import router from "./routes/apartmentRoute";
import routerPayment from "./routes/paymentRoute";
import routerUser from "./routes/userRoute";

const app = express();

const bodyParser = require('body-parser');
 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json())

app.use("/apartment", router)
app.use("/payment", routerPayment)
app.use("/users", routerUser)






export default app


 
