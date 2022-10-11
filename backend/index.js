const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 4000;

const { getProfile, getUser } = require("./handlers/userHandlers");

const {
  postTrip,
  getAllTrips,
  getTrip,
  getTripsByAuthor,
  getFavoriteTrips,
  patchFavorite,
  deleteTrip,
} = require("./handlers/tripHandlers");

express()
  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

  //User Collection
  .get("/profile/:myId", getProfile)
  .get("/user/:user", getUser)

  // //Trip Collection
  .post("/add-trip", postTrip)
  .get("/trips", getAllTrips)
  .get("/trip/:tripId", getTrip)
  .get("/trips-by-author/:authorId", getTripsByAuthor)
  .get("/favorite-trips/:userId", getFavoriteTrips)
  .patch("/favorite-unfavorite", patchFavorite)
  .delete('/delete-trip/:tripId', deleteTrip)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
