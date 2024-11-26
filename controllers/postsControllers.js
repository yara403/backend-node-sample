import {getAllPosts, createPost, updateNewPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listAll(req, resp) {
    // Retrieve all posts using the getAllPosts function
    const posts = await getAllPosts();

    // Send the retrieved posts as a JSON response with a 200 status code
    return resp.status(200).json(posts);
}

export async function save(req, resp) {
    const newPost = req.body;
    try {
        const post = await createPost(newPost);
        resp.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        resp.status(500).json({'ERROR':'Request failure'});
    }
}

export async function uploadImg(req, resp){
    const newPost = {
        description: "",
        image_url: req.file.originalname
      }
    try {
        const post = await createPost(newPost);

        const extension = newPost.image_url.split(".").pop();
        var newFileName = 'uploads/'+post.insertedId;
        newFileName += "."+extension;
        fs.renameSync(req.file.path, newFileName);
        
        resp.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        resp.status(500).json({'ERROR':'Request failure'});
    }
}

export async function updateNewImg(req, resp){
    const id = req.params.id;
    const image_url = 'localhost:3000/'+id;
    const imgBuffer = fs.readFileSync("uploads/"+id+".jpg");
    const description = await gerarDescricaoComGemini(imgBuffer);
    
    const post = {
        description: description,
        image_url: image_url
    }
 
    try {
        const oldPost = await updateNewPost(id, post);
        resp.status(200).json(oldPost);
    } catch (error) {
        console.error(error.message);
        resp.status(500).json({'ERROR':'Request failure'});
    }
}