import React from 'react';

function FormInput({ label, value, onChange, type = 'text', name, error }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                value={value}
                onChange={onChange}
                name={name}
            />
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

export default FormInput;