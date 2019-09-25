const controller = require('../controllers/channels')
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
router.get('/all', controller.getAllItems)
router.get('/ids', controller.getAllIds)

router.post('/:id/shows', controller.addShow)
router.get('/:id/shows/:id_show', controller.getShowByChannelAndId)
router.patch('/:id/shows/:id_show', controller.updateShow)
router.get('/:id', controller.getChannel)
router.delete('/:id/shows/:id_show', controller.deleteShow)
router.patch(
  '/:id/shows/:id_show/chapters/:id_chapter',
  controller.updateChapter
)
router.delete(
  '/:id/shows/:id_show/chapters/:id_chapter',
  controller.deleteChapter
)
module.exports = router
