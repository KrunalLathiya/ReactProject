import { useState } from 'react';
import { addBusiness } from '../services/businessService';

export function useCreateBusiness() {
    const [formData, setFormData] = useState({
        person_name: '',
        business_name: '',
        gst_number: '',
        business_image: null
    });
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let msg = '';
        if (!value) { // If the value is null or undefined, set the error message based on the field.
            msg = `${name.replace('_', ' ')} is required.`;
        } else if (name === 'business_image') { // Specific checks for 'business_image'
            // Check if the file is of an allowed type by inspecting the MIME type
            const validTypes = ['image/png', 'image/jpeg'];
            if (!validTypes.includes(value.type)) {
                msg = 'Only PNG or JPG files are allowed.';
            }
        }
        // Update the errors state
        setErrors(prevErrors => ({ ...prevErrors, [name]: msg }));
        return msg;
    };

    const submitData = async () => {
        let valid = true;
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) valid = false;
        });

        if (!valid) return false;

        try {
            await addBusiness(formData);
            return true; // Indicate success
        } catch (err) {
            // Handle server-side errors
            setErrors({ general: 'An unexpected error occurred.' });
            return false; // Indicate failure
        }
    };

    return { formData, setFormData, submitData, errors, validateField };
}