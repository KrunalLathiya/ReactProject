import React from 'react';
import FormInput from './FormInput';
import FormFile from './FormFile';

function BusinessForm({ formData, setFormData, onSubmit, errors, validateField }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateField('business_image', file);
            setFormData(prevFormData => ({
                ...prevFormData,
                business_image: file
            }));
        } else {
            validateField('business_image', null);
        }
    };

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <FormInput
                label="Person Name:"
                type="text"
                name="person_name"
                value={formData.person_name}
                onChange={handleChange}
                error={errors.person_name}
            />
            <FormInput
                label="Business Name:"
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                error={errors.business_name}
            />
            <FormInput
                label="GST Number:"
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                error={errors.gst_number}
            />
            <FormFile
                label="Upload Image"
                onChange={handleFileChange}
                name="business_image"
                error={errors.business_image}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default BusinessForm;
