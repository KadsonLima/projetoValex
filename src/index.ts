import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/erroHandlerMiddleware';
import 'express-async-errors';
import router from './routers/router';


dotenv.config();

const app = express()

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler)


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`SERVER RODANDO NA PORTA : ${PORT}`)
})