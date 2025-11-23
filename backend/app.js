import express from 'express';

const app = express();
app.use(express.static('../frontend/dist'))


app.get("/", (req, res) => {
    res.send({data:"Hello"})

});



const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
})