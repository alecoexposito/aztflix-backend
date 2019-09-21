const { matchedData } = require('express-validator')
const model = require('../../models/channel')
const utils = require('../../middleware/utils')
const db = require('../../middleware/db')
const pathLib = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'public/uploads/videos',
  filename(req, file, cb) {
    cb(null, Date.now() + pathLib.extname(file.originalname))
  }
})

const upload = multer({ storage }).single('file')

/********************
 * Public functions *
 ********************/

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.upload = async (req, res) => {
  try {
    let path = ''
    // console.log(req);
    upload(req, res, err => {
      if (err) {
        // An error occurred when uploading
        console.log(err)
        return res.status(422).send('an Error occured')
      }
      // No error occured.

      path = req.file.path
      const idChannel = req.body.idChannel
      const idShow = req.body.idShow

      model.findById(idChannel, (err, doc) => {
        if (err) {
          throw err
        } else {
          const q = doc.shows.id(idShow)
          const maxNumber = getMaxNumber(q.chapters)
          const chapter = {
            number: maxNumber + 1,
            name: pathLib.basename(req.file.originalname, '.mp4'),
            title: '',
            path: req.file.filename
          }
          q.chapters.push(chapter)
          doc.save()
          console.log(chapter)
          return res.send({ chapter })
        }
      })
    })
  } catch (err) {
    utils.handleError(res, error)
  }
}

function getMaxNumber(chapters) {
  let max = 0
  for (i in chapters) {
    if (chapters[i].number > max) {
      max = chapters[i].number
    }
  }
  return max
}

exports.updateChapter = async (req, res) => {
  console.log('updating chapter')
}
