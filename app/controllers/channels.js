const model = require('../models/channel')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')

const getAllItemsFromDB = async () => {
  return new Promise((resolve, reject) => {
    model.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateShow = async (req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id)

    if (req.body.noFile == undefined) {
      console.log('en el if que dice que hay fichero')
      const storage = multer.diskStorage({
        destination: 'public/uploads/shows',
        filename(req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname))
        }
      })
      const upload = multer({ storage }).single('file')

      let filePath = ''
      // console.log(req);
      upload(req, res, err => {
        if (err) {
          // An error occurred when uploading
          return res.status(422).send('an Error occured')
        }
        // No error occured.
        filePath = req.file.path
        const modelObj = JSON.parse(req.body.model)
        modelObj.image = req.file.filename
        console.log('model obj: ', modelObj)
        updateShowItem(id, modelObj, res)
      })
    } else {
      console.log(req.body)
      updateShowItem(id, req.body.model, res)
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.addShow = async (req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id)
    const storage = multer.diskStorage({
      destination: 'public/uploads/shows',
      filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
      }
    })
    const upload = multer({ storage }).single('file')
    let filePath = ''
    // console.log(req);
    upload(req, res, err => {
      if (err) {
        // An error occurred when uploading
        return res.status(422).send('an Error occured')
      }
      // No error occured.
      filePath = req.file.path
      const modelObj = JSON.parse(req.body.model)
      modelObj.image = req.file.filename
      insertShow(id, modelObj, res)
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

insertShow = function(channelId, model2, res) {
  model.findById(channelId, (error, channel) => {
    if (error) {
      throw error
    } else {
      model2._id = mongoose.Types.ObjectId()
      channel.shows.push(model2)
      channel.save()

      res.status(200).send({ inserted: model2 })
    }
  })
}

updateShowItem = function(channelId, model2, res) {
  model.findOneAndUpdate(
    { _id: channelId, 'shows._id': model2._id },
    {
      $set: {
        'shows.$.name': model2.name,
        'shows.$.description': model2.description,
        'shows.$.image': model2.image
      }
    },
    (err, doc) => {
      if (err) {
        throw err
      } else {
        res.status(200).send({ updated: model2 })
      }
    }
  )
}

exports.getChannel = async (req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id)
    console.log('id: ', id)
    model.findById(id, (error, channel) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ data: channel })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.deleteShow = async (req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id)
    const id_show = await utils.isIDGood(req.params.id_show)
    model.findById(id, (error, doc) => {
      doc.shows.id(id_show).remove()
      doc.save()
      res.status(200).send({ success: true })
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.getShowByChannelAndId = async (req, res) => {
  try {
    // req = matchedData(req)
    const idChannel = await utils.isIDGood(req.params.id)
    const idShow = await utils.isIDGood(req.params.id_show)
    model.findById(idChannel, (error, channel) => {
      if (error) {
        throw error
      } else {
        const show = channel.shows.id(idShow)
        res.status(200).send({ show })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.updateChapter = async (req, res) => {
  try {
    // req = matchedData(req)
    const idChannel = await utils.isIDGood(req.params.id)
    const idShow = await utils.isIDGood(req.params.id_show)
    model.findById(idChannel, (error, channel) => {
      if (error) {
        throw error
      } else {
        const data = req.body.data
        channel.shows.id(idShow).chapters.id(data._id).number = data.number
        channel.shows.id(idShow).chapters.id(data._id).title = data.title
        channel.save()
        res
          .status(200)
          .send({ updated: channel.shows.id(idShow).chapters.id(data._id) })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.deleteChapter = async (req, res) => {
  try {
    // req = matchedData(req)
    const idChannel = await utils.isIDGood(req.params.id)
    const idShow = await utils.isIDGood(req.params.id_show)
    const idChapter = await utils.isIDGood(req.params.id_chapter)
    model.findById(idChannel, (error, channel) => {
      if (error) {
        throw error
      } else {
        channel.shows
          .id(idShow)
          .chapters.id(idChapter)
          .remove()
        channel.save()
        res.status(200).send({ success: true })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}
