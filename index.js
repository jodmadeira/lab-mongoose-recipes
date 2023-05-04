const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made

    //Iteration 2
    let caril = {
      title: 'Caril',
      level:'Amateur Chef',
      ingredients: ['chicken', 'olive oil','Madras powder','coriander', 'tomato paste', 'salt', 'pepper' ],
      cuisine:'Indian',
      dishType:'main_course',
      image:'https://www.pingodoce.pt/wp-content/uploads/2016/09/caril-de-frango.jpeg',
      duration:90,
      creator: 'Johnny Woods',
    }

    await Recipe.create(caril);
    let foundCaril = await Recipe.find({name: 'Caril'})
    console.log(foundCaril)
    
    
    //Iteration 3
    await Recipe.create(data)
    let allRecipes = await Recipe.find();
    //console.log(allRecipes)
    let dishTitles=[]
    for (let i=0;i<allRecipes.length;i++){
      dishTitles.push(allRecipes[i].title)
    }
    console.log(dishTitles)

    //Iteration 4
    await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100});
    //console.log(await Recipe.find({title:'Rigatoni alla Genovese'}));
    console.log('Sucess! You have updated your dish duration')

    //Iteration 5
    await Recipe.deleteOne({title:'Carrot Cake'})
    console.log('You have sucessfully removed Carrot Cake from the Database');

    //Iteration 6
    mongoose.connection.close(function() {console.log('Mongoose connection closed')});
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();



//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
