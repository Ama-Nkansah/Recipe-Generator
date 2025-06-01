import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async(req, res) => {
   const { ingredient } = req.query;
try{
const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
//? tenary operator as if-else
//meals array returned by API based on URL query(if meals exist return 1st meal in array else null)
const meal = response.data.meals ? response.data.meals[0] : null;
//with recipe var checks if meal exist show the name and other else null
const recipe = meal
      ? {
          name: meal.strMeal,
          ingredients: ['chicken', 'Other ingredients based on API response'],
          instructions: 'API does not provide instructions for filtering by ingredient.',
        }
      : null;
    console.log(recipe); 
    res.render('main', { recipe });
}catch (error) {
  console.error("Error caught:", error);
  res.status(500).send("Server error");
}
});


app.listen(port, () => {
  console.log(`Server running at ${port}`);
});