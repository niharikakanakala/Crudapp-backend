const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');


const dotenv = require('dotenv');

var cors = require('cors');

dotenv.config();

app.use(cors());

app.use(express.json());

const Image = require("./model/image.js");

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', cors(), (req,res)=> {
    res.send('Welcome To my CRUD APP');
});



app.get('/images', async(req, res) => {
    try {
        const data = await Image.find({});

        res.status(200).send(data);
    } catch (error) {
        console.log('errror', error);
        res.status(500).send(error.toString());
    }
});

app.post('/images', function (req, res, next) {
    try {
        const post = new Image({
            imageName: req.body.imageName,
            imageURL: req.body.imageURL,
            imageDetails: req.body.imageDetails,
          })
          post.save(function (err, post) {
            if (err) { return next(err) }
            res.json(201, post)
          })
    } catch (error) {
        console.log('errror', error);
        res.status(500).send(error.toString());
    }
});

  app.get('/images/:id', async(req, res) => {
    try {
        const data = await Image.findById(req.params.id);

        res.status(200).send(data);
    } catch (error) {
        console.log('errror', error);
        res.status(500).send(error.toString());
    }
});

app.delete('/images/delete/:id', async(req, res) => {
    try {
        const data = await Image.findByIdAndDelete(req.params.id);

        res.status(200).send(data);
    } catch (error) {
        console.log('errror', error);
        res.status(500).send(error.toString());
    }
});

app.put('/images/:id/edit', async(req, res) => {
    try {
        const data = await Image.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).send(data);
    } catch (error) {
        console.log('errror', error);
        res.status(500).send(error.toString());
    }
});

// const CONNECTION_URL =  'mongodb+srv://Niharika:Ravindra-123@image-app.12uy8ib.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));