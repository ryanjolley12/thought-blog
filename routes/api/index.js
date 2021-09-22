const router = require('express').Router();
const commentRoutes = require('./user-routes');
const postRoutes = require('./thought-routes');

//add prefix of `/users` to routes created in `user-routes.js`
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;