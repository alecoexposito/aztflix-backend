const controller = require('../controllers/channels/chapter-upload')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Get items route
 */
router.post(
  '/',
  // requireAuth,
  // AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.upload
)

// router.get(
//   '/',
//   function(req, res, next) {
//     res.send("dsf")
//   }
// )
module.exports = router
