import 'dotenv/config.js';
// Import the function to connect to the database
import { ObjectId } from "mongodb";
import conectarAoBanco from "../src/config/dbConfig.js"

// Establish a database connection using the provided connection string
const connection = await conectarAoBanco(process.env.DB_CONNECTION);

// Asynchronous function to retrieve all posts from the database
export async function getAllPosts() {
    // Select the 'instalike' database
    const db = connection.db("instalike");

    // Select the 'posts' collection within the database
    const collection = db.collection("posts");

    // Find all documents in the collection and return them as an array
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = connection.db("instalike");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function updateNewPost(id, newPost) {
    const db = connection.db("instalike");
    const collection = db.collection("posts");

    const objID = new ObjectId(ObjectId.createFromHexString(id));
    var post = await collection.findOne({_id: objID});
    newPost.image_url += "."+post.image_url.split(".").pop();

    return collection.updateOne({_id: objID},{$set: newPost});
}