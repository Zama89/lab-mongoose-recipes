const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create ({
      title: "Pastelito",
      level: "Easy Peasy",
      ingredients: "Mucho amor, tiempo, dedicación",
      cuisine: "Vasca",
      dishType: "breakfast",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 90,
      creator: "Yo",
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      {title:'Rigatoni alla Genovese'},
      {duration: 100},
      {new:true},
      console.log('Duration modified.'))
  })
  .then((timeActual) => {
    console.log("updated duration", timeActual);
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipeDeleted) => {
    console.log("Carrot Cake is deleted", recipeDeleted)
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
