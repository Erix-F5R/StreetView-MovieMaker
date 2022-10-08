const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 4000;

const {
  getProfile,
  getUser,
} = require("./handlers/userHandlers");

const {
  postTrip, getAllTrips, getTrip
} = require("./handlers/tripHandlers")
 
express()

  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

//User Collection
  .get('/profile/:myId', getProfile)
  .get('/user/:user' , getUser)
//   .patch('/favorite/:trip', favoriteTrip)
//   .patch('/unfavorite/:trip', unfavoriteTrip)
  
  
// //Trip Collection
//   .get('/trip/:trip', getTrip)

//Why does the trip object look like?
  .post('/add-trip', postTrip)
  .get('/trips', getAllTrips)
  .get('/trip/:tripId' , getTrip)
//   .delete('/delete-trip/:trip', deleteTrip)




  .get('/test', (req,res) => {
    res.status(200).json({message: 'test'})
  })

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
