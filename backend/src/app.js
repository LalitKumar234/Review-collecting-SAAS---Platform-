import express from "express";
import cors from "cors"
import routes from "./routes/index.js"
import dotenv from 'dotenv';
import { submitForm } from "./controllers/form.controller.js"

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

app.post("/submit/:id", submitForm)
app.use("/v1", routes);


app.get("/", (req, res) => {
    res.send('hello world')
})

export default app;