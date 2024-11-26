import express from "express"
import multer from "multer";
import { listAll, save, uploadImg, updateNewImg } from "../controllers/postsControllers.js";
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200
}
const upload = multer({dest: "./uploads"});

const routes = (app)=>{
    // Enable JSON parsing for incoming requests
    app.use(express.json());
    app.use(cors(corsOptions));

    // Define a GET route to handle requests to '/posts'
    app.get("/posts", listAll);
    app.post("/save", save);
    app.post("/upload", upload.single("image"), uploadImg);
    app.put("/upload/:id", updateNewImg);
}

export default routes;