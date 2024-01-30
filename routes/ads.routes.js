const express = require('express');
const router = express.Router();

const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const ads = require('../controllers/ads.controller');

// GET /api/ads 
router.get('/ads', ads.getAllAds);

// GET /api/ads/:id
router.get('/ads/:id', ads.getAdById);

// POST /api/ads
router.post('/ads', authMiddleware, imageUpload.single('image'), ads.createAd);

// DELETE /api/ads/:id 
router.delete('/ads/:id',authMiddleware, ads.deleteAd);

// PUT lub PATCH /api/ads/:id
router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('image'),
  ads.updateAd
);

router.get('/ads/search/:searchPhrase', ads.searchAdsByTitle);

module.exports = router;
