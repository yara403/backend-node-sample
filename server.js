// Import the Express framework for building web applications
import express from "express";
import routes from "./routes/postsRoutes.js";

// Create an Express application instance
const app = express();
app.use(express.static("uploads"));
routes(app);

// Start the server on port 3000 and log a message upon successful startup
app.listen(3000, () => {
    console.log('Server Ok, listening at 3000');
});

// const posts = [
//     { id: 1, description: 'Imagem teste', image: 'https://placecats.com/neo_banana/300/200' },
//     { id: 2, description: 'Gato brincando com um novelo de lã', image: 'https://placekitten.com/400/300' },
//     { id: 3, description: 'Cachorro correndo na praia', image: 'https://placecats.com/neo/300/200' },
//     { id: 4, description: 'Comida deliciosa', image: 'https://placecats.com/millie/300/150' },
//     { id: 5, description: 'Cidade à noite', image: 'https://placecats.com/millie_neo/300/200' },
//     { id: 6, description: 'Flores coloridas', image: 'https://placecats.com/neo_2/300/200' },
//     { id: 7, description: 'Astronauta no espaço', image: 'https://placecats.com/bella/300/200' }
// ];

// app.get('/posts/:id', (req, resp)=>{
//     const index = searchByIndex(req.params.id);
//     resp.status(200).json(posts[index]);
// });

// function searchByIndex(id){
//     return posts.findIndex(
//         (post)=>{return post.id === Number(id)}
//     );
// }