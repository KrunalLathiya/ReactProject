const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    person_name: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    gst_number: {
        type: String,  // Change this from Number to String
        required: [true, 'GST number is required'],
        validate: {
            validator: function (v) {
                return /^[0-9A-Za-z]+$/.test(v); // Validate the format if it's always 15 characters alphanumeric (India's GST format)
            },
            message: props => `${props.value} is not a valid GST number!`
        }
    },
    business_image: {  // New field to store the image path
        type: String,
        required: false  // Make it not required in case no image is uploaded
    }
}, {
    collection: 'business'
});

module.exports = mongoose.model('Business', businessSchema);