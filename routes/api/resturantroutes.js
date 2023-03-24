const express = require('express');

const router = express.Router();

const db = require('../../models');

const sdk = require('api')('@yelp-developers/v1.0#deudoolf6o9f51');
// GET /food/search?query=:query&location=:location
router.get('/search', async (req, res) => {
  try {
    const { query, location } = req.query;
   

    sdk.auth('Bearer rIlRo2Z3djEtgTLsWff7db1cLfiVpo5_SooNu_3h95PDpHSXuAn9m59ZaTQh_i8v_B4GnFdxLEANjuHDjV6HTKOoWjhAcSKAxhWgWR8czVTr1680pkuvNJ6j3egdZHYx');
    const { data: { businesses } } = await sdk.v3_business_search({
      location: 'New%20York%20City',
      radius: '40000',
      categories: 'restaurant',
      price: 1,
      sort_by: 'best_match',
      limit: '20'
    });

    const businessData = businesses.map((business) => ({
      name: business.name,
      rating: business.rating,
      categories: business.categories,
      price: business.price

    }))

    res.json(businessData)

    // // query the Yelp API using the user's search parameters
    // const results = await yelpApi.search(query, location);

    // // filter out any results that don't match the Food model's categories
    // const validResults = results.filter(r => db.Food.categories.includes(r.category));

    // // find the location in the database that matches the user's location
    // const dbLocation = await db.Location.findOne({ where: { name: location } });

    // // create a new record for each valid result, associating it with the location in the database
    // const foods = await Promise.all(validResults.map(r => db.Food.create({
    //   name: r.name,
    //   rating: r.rating,
    //   locationId: dbLocation.id
    // })));

    // // return the top 3 foods by rating
    // const topFoods = foods.sort((a, b) => b.rating - a.rating).slice(0, 3);

    // res.json(topFoods);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
    