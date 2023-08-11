// Import the required packages
const express = require('express');    // Express framework for creating the server
const mongoose = require('mongoose');  // Mongoose for MongoDB integration

// Create an instance of Express
const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,               // Use the new URL parser
  useUnifiedTopology: true            // Use the new Server Discovery and Monitoring engine
})
  .then(async () => {
    console.log('Conexión a MongoDB exitosa');  // Connection successful message

    // Define a schema and model for the "fruits" collection
    const fruitSchema = new mongoose.Schema({
      name: String,                     // Name of the fruit
      score: Number,                    // Score/rating of the fruit
      review: String                    // Review or description of the fruit
    });

    const Fruit = mongoose.model('Fruit', fruitSchema); // Create a model named 'Fruit'

    // Create an array of fruit documents to insert
    const fruits = [
      {
        name: "apple",
        score: 8,
        review: "Awesome Fruit"
      },
      {
        name: "orange",
        score: 7,
        review: "Wonder Fruit"
      },
      {
        name: "banana",
        score: 9,
        review: "Great Fruit"
      }
    ];

    const personSchema = new mongoose.Schema({
      name: String,                     // Name of the person
      age: Number,
    });

    const Person = mongoose.model('Person', personSchema);

    const persons = [
      {
        name: "Edu",   
        age: 25
      }
    ];

    // Insert the fruits array into the "fruits" collection
    try {
      // Insert the fruits array into the "fruits" collection
      await Fruit.insertMany(fruits);
      await Person.create(persons)
      console.log('Documents inserted successfully');
  
      // Close the MongoDB connection
      mongoose.connection.close();
    } catch (err) {
      console.error('Error inserting documents:', err);
    }
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error); // Connection error message
  });

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000'); // Server start message
});
