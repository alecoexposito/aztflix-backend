const model = require('../models/ad')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const multer = require('multer')
const pathLib = require('path')
const mongoose = require('mongoose')

exports.getAllAds = async (req, res) => {
  try {
    // req = matchedData(req)
    model.find((error, ads) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ ads: ads })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.getAd = async (req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id)
    model.findById(id, (error, ad) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ ad: ad })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.updateAd = async(req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id);
    const pAd = req.body.data;
    model.findById(id, (error, ad) => {
      if (error) {
        throw error
      } else {
        ad.name = pAd.name;
        ad.save();
        res.status(200).send({ updated: ad })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}

const storage = multer.diskStorage({
  destination: 'public/uploads/ads',
  filename(req, file, cb) {
    cb(null, Date.now() + pathLib.extname(file.originalname))
  }
})

const upload = multer({ storage }).single('file')

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

      path = req.file.filename
      const name = pathLib.basename(req.file.originalname, '.mp4');
      var newAd = {
        _id: mongoose.Types.ObjectId(),
        name: name,
        path: path,
      }
      model.create(newAd);
      return res.send({ ad: newAd });

    });
  } catch (err) {
    utils.handleError(res, error)
  }
}

exports.deleteAd = async(req, res) => {
  try {
    // req = matchedData(req)
    const id = await utils.isIDGood(req.params.id);
    const pAd = req.params.ad;
    model.findByIdAndRemove(id, (error, ad) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ success: true })
      }
    })
  } catch (error) {
    utils.handleError(res, error)
  }
}
