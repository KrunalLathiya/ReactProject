import React from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessForm from './forms/BusinessForm';
import { useCreateBusiness } from '../hooks/useCreateBusiness';

function Create() {
    const { formData, setFormData, submitData, errors, validateField } = useCreateBusiness();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (await submitData()) {
            sessionStorage.setItem('successMessage', 'Data saved successfully!');
            navigate('/index', { replace: true, state: { refresh: true } });
        }
    };

    if (errors.general) return <p className="text-danger">{errors.general}</p>;

    return (
        <div className="container mt-3">
            <h3>Adding New Business</h3>
            <BusinessForm formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                errors={errors}
                validateField={validateField} />
        </div>
    );
}

export default Create;