const express = require('express');

const router = express.Router();

const db = require('../../models');

// GET /food/search?query=:query&location=:location
router.get('/search', async (req, res) => {
  try {
    const { query, location } = req.query;

    // query the Yelp API using the user's search parameters
    const results = await yelpApi.search(query, location);

    // filter out any results that don't match the Food model's categories
    const validResults = results.filter(r => db.Food.categories.includes(r.category));

    // find the location in the database that matches the user's location
    const dbLocation = await db.Location.findOne({ where: { name: location } });

    // create a new record for each valid result, associating it with the location in the database
    const foods = await Promise.all(validResults.map(r => db.Food.create({
      name: r.name,
      rating: r.rating,
      locationId: dbLocation.id
    })));

    // return the top 3 foods by rating
    const topFoods = foods.sort((a, b) => b.rating - a.rating).slice(0, 3);

    res.json(topFoods);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
    