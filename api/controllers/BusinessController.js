const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const Business = require('../models/Business');
const { validateBusiness, handleValidationErrors } = require('../validation/BusinessValidate');
const { handleError, createPdfDocument } = require('../utils/helpers');

exports.addBusiness = [
    ...validateBusiness,
    handleValidationErrors,
    async (req, res) => {
        const business = new Business({
            ...req.body,
            business_image: req.file ? req.file.path : undefined
        });

        try {
            await business.save();
            res.status(200).json({ message: 'Business added successfully' });
        } catch (err) {
            handleError(res, err, 400);
        }
    }
];

exports.getAllBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        handleError(res, err);
    }
};

exports.getBusiness = async (req, res, next) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.json(business);
    } catch (err) {
        handleError(res, err);
    }
};

exports.updateBusiness = [
    ...validateBusiness, // Include the validation middleware
    handleValidationErrors, // Handle any validation errors
    async (req, res) => {
        try {
            const business = await Business.findById(req.params.id);
            if (!business) {
                return res.status(404).json({ error: "Business not found" });
            }

            // Check if a new image has been uploaded
            if (req.file) {
                // If an old image exists and it's different from the new image, delete it
                if (business.business_image && business.business_image !== req.file.path) {
                    await unlinkAsync(business.business_image).catch(err => console.error("Failed to delete old image", err));
                }
                // Set the new image path
                business.business_image = req.file.path;
            }

            // Update other business details
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.gst_number = req.body.gst_number;

            await business.save();
            res.json({ message: 'Update complete' });
        } catch (err) {
            handleError(res, err, 400);
        }
    }
];

exports.deleteBusiness = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        const imagePath = business.business_image;
        if (imagePath) {
            await unlinkAsync(imagePath);
        }
        res.json({ message: 'Successfully removed' });
    } catch (err) {
        handleError(res, err);
    }
};

exports.downloadPDF = async (req, res, next) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).send("Business not found");
        }

        const pdfDoc = createPdfDocument(business);
        pdfDoc.end();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="business-details.pdf"');
        pdfDoc.pipe(res);
    } catch (err) {
        handleError(res, err, 500);
    }
};