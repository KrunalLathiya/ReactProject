const { body, validationResult } = require('express-validator');

exports.validateBusiness = [
    body('person_name').isLength({ min: 1 }).withMessage('Person name is required.'),
    body('business_name').isLength({ min: 1 }).withMessage('Business name is required.'),
    body('gst_number').isLength({ min: 1 }).withMessage('GST number is required.')
        .isAlphanumeric().withMessage('GST number must be alphanumeric.'),
];

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
