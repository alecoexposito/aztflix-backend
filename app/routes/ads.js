const controller = require('../controllers/ads')
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
 * Get all items route
 */
router.get('/all', controller.getAllAds)
router.post('/upload', controller.upload)

router.get('/:id', controller.getAd)
router.patch('/:id', controller.updateAd)
router.delete('/:id', controller.deleteAd)

module.exports = router
