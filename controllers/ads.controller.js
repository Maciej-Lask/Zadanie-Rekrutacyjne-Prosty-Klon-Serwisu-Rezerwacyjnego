const Ad = require('../models/Ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');
const User = require('../models/User.model');

// Handles the GET request to /api/ads
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate('sellerInfo'); // Populating the "sellerInfo" field of the author
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving ads.' });
  }
};

// Handles the GET request to /api/ads/:id
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('sellerInfo'); // Populating the "sellerInfo" field of the author
    if (!ad) {
      return res
        .status(404)
        .json({ error: 'Ad not found.' });
    }
    res.status(200).json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the ad.' });
  }
};

// Handles the POST request to /api/ads
exports.createAd = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (
      title &&
      content &&
      price &&
      location &&
      req.file &&
      ['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)
    ) {
      const newAd = await Ad.create({
        title,
        content,
        price,
        location,
        sellerInfo: req.session.userId,
        image: req.file.filename,
      });

      res.status(201).json(newAd);
    } else {
      console.log(title, content, price, location, req.file);
      if (req.file) {
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      }

      res.status(400).json({ error: 'Invalid ad data.' });
    }
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    }
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the ad.' });
  }
};

// Handles the DELETE request to /api/ads/:id
exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const userId = req.session.userId;

    const ad = await Ad.findById(adId);
    if (!ad) {
      return res
        .status(404)
        .json({ error: 'Ad not found.' });
    }

    if (ad.sellerInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Permission denied to delete this ad.' });
    }

    if (ad.image) {
      const imagePath = `./public/uploads/${ad.image}`;
      fs.unlinkSync(imagePath);
    }

    const deletedAd = await Ad.findByIdAndDelete(adId);
    if (!deletedAd) {
      return res
        .status(404)
        .json({ error: 'Ad not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the ad.' });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const userId = req.session.userId;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    const existingAd = await Ad.findById(adId);

    if (!existingAd) {
      return res
        .status(404)
        .json({ error: 'Ad not found.' });
    }

    if (existingAd.sellerInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Permission denied to edit this ad.' });
    }

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
      return res.status(400).json({
        error: 'Invalid file format.',
      })
    }

    const updatedAdData = req.body;

    if (
      req.file &&
      ['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)
    ) {
      if (existingAd.image) {
        fs.unlinkSync(`./public/uploads/${existingAd.image}`);
      }
      updatedAdData.image = req.file.filename;
    }
    if (!req.file) {
      updatedAdData.image = existingAd.image;
    }

    const updatedAd = await Ad.findByIdAndUpdate(adId, updatedAdData, {
      new: true,
    });

    res.status(200).json(updatedAd);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    }
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the ad.' });
  }
};

// Handles the GET request to /api/ads/search/:searchPhrase
exports.searchAdsByTitle = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const ads = await Ad.find({
      title: { $regex: searchPhrase, $options: 'i' },
    });
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while searching for ads.' });
  }
};
