require('dotenv').config();

const express = require('express');
const app = express();
const fruits = require('./fruits.json');
const port = process.env.PORT;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Hello, Fruity API!')
})

// Return all the fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits)
})


// Return a single fruit route
// what if the fruit is not found? 
// what if the user submits a fruit with no capital letters?
app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);

    if (fruit == undefined) {
        res.status(404).send()
    } else {
        res.status(200).send(fruit)
    }
})

app.post("/fruits", (req, res) => {
    // first check if a fruit with the name specified by the user already exists
    const fruit = fruits.find((fruit) => fruit.name == req.body.name);

    if(fruit != undefined) {
        res.status(409).send(); 
    } else {
        fruits.push(req.body);

        res.status(201).send(req.body)
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})