import React from 'react';

function FormFile({ label, onChange, name, error }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="file"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                onChange={onChange}
                name={name}
            />
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

export default FormFile;
