import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BusinessForm from './forms/BusinessForm';
import { useEditBusiness } from '../hooks/useEditBusiness';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { formData, setFormData, updateData, isLoading, errors, validateField } = useEditBusiness(id);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (await updateData(formData)) {
            sessionStorage.setItem('successMessage', 'Data updated successfully!');
            navigate('/index', { replace: true });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (errors.general) return <p className="text-danger">{errors.general}</p>;

    return (
        <div className="container mt-3">
            <h3>Edit Business</h3>
            <BusinessForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} errors={errors} validateField={validateField} />
        </div>
    );
}

export default Edit;
