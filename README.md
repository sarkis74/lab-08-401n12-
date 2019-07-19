![CF](http://i.imgur.com/7v5ASc8.png)  

## Data Modeling [![Build Status]()

### Author: Sarkis Aghazarian

### Links and Resources
* [github](https://github.com/sarkis74/lab-08-401n12-)
* [travis](https://travis-ci.org/sarkis74/lab-08-401n12-)

#### Running the app
* `npm start`
* GET: `/categories`
* GET: `/products`
  * Returns a JSON object containing every product or category.
* GET: `/categories/:id`
* GET: `/productss/:id`
  * Returns a JSON object containing the specified product or category.
* POST: `/categories`
* POST: `/products`
  * Creates a new product or category in the database.
* PUT: `/categories/:id`
* PUT: `/productss/:id`
  * Updates the specified, extant, product or category in the database.
* DELETE: `/categories/:id`
* DELETE: `/productss/:id`
  * Deletes the specified, extant, product or category in the database.  
  
#### Tests
* `npm test`
* Can we make successful calls to every route and method in our server.
