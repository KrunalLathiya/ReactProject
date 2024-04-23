import { useEffect, useState } from 'react';
import { fetchBusinessById, updateBusiness } from '../services/businessService';

export function useEditBusiness(id) {
    const [formData, setFormData] = useState({
        person_name: '',
        business_name: '',
        gst_number: '',
        business_image: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchBusinessById(id).then(data => {
            setFormData({
                person_name: data.person_name,
                business_name: data.business_name,
                gst_number: data.gst_number,
                business_image: data.business_image
            });
            setLoading(false);
        }).catch(error => {
            setErrors({ general: 'Failed to fetch business data' });
            setLoading(false);
        });
    }, [id]);

    const validateField = (name, value) => {
        let msg = '';
        if (!value) {
            msg = `${name.replace('_', ' ')} is required.`;
        } else if (name === 'gst_number' && !/^[0-9A-Za-z]+$/.test(value)) {
            msg = 'GST number must be alphanumeric.';
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: msg
        }));

        return msg === '';
    };

    const updateData = async (data) => {
        let isValid = true;
        Object.keys(data).forEach(key => {
            if (!validateField(key, data[key])) {
                isValid = false;
            }
        });

        if (!isValid) {
            return false;
        }

        setLoading(true);
        try {
            await updateBusiness(id, data);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors({ general: 'Error updating data' });
            setLoading(false);
            return false;
        }
    };

    return { formData, setFormData, updateData, errors, validateField, isLoading };
}