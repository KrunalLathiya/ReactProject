const express = require('express');
const businessRoutes = express.Router();
const upload = require('../utils/multerConfig'); // Import multer configuration

const {
    addBusiness,
    getAllBusinesses,
    getBusiness,
    updateBusiness,
    deleteBusiness,
    downloadPDF
} = require('../controllers/BusinessController');

// Define routes using the modularized upload middleware
businessRoutes.post('/add', upload.single('business_image'), addBusiness);
businessRoutes.get('/', getAllBusinesses);
businessRoutes.get('/edit/:id', getBusiness);
businessRoutes.post('/update/:id', upload.single('business_image'), updateBusiness);
businessRoutes.delete('/delete/:id', deleteBusiness);
businessRoutes.get('/download-pdf/:id', downloadPDF);

module.exports = businessRoutes;