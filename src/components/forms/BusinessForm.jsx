import React from 'react';
import FormInput from './FormInput';
import FormFile from './FormFile';
import ReactQuill from 'react-quill'; // Import react-quill
import 'react-quill/dist/quill.snow.css'; // Include the Quill stylesheet

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
    const handleDescriptionChange = (value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            description: value
        }));
        validateField('description', value);
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
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <ReactQuill
                    className="custom-quill"
                    theme="snow"
                    value={formData.description || ''}
                    onChange={handleDescriptionChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default BusinessForm;
