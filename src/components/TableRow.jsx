import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';

const TableRow = memo(({ business, deleteItem, downloadPdf }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        await deleteItem(business._id);
        setShowModal(false);
    };

    return (
        <tr>
            <td>{business.person_name}</td>
            <td>{business.business_name}</td>
            <td>{business.gst_number}</td>
            <td>
                <img src={`http://localhost:4000/${business.business_image}`} alt="Business" style={{ width: "100px", height: "auto" }} />
            </td>
            <td>
                <Link to={`/edit/${business._id}`} className="btn btn-primary btn-sm">Edit</Link>
            </td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>Delete</button>
                {showModal && (
                    <ConfirmationModal
                        onClose={() => setShowModal(false)}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </td>
            <td>
                <a href={`http://localhost:4000/business/download-pdf/${business._id}`} target="_blank" rel="noopener noreferrer">
                    Download PDF
                </a>
            </td>
        </tr>
    );
});

const ConfirmationModal = ({ onClose, onConfirm }) => (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-modal="true" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this item?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    </div>
);

export default TableRow;