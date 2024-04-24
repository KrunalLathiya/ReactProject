import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TableRow from './TableRow';
import { useIndexBusiness } from '../hooks/useIndexBusiness';


function Index() {
    const location = useLocation();
    const { businesses, deleteItem, error } = useIndexBusiness(location.state);

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const message = sessionStorage.getItem('successMessage');
        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem('successMessage');
        }
    }, []);
    if (error) return <p>{error}</p>;

    return (
        <div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Person Name</th>
                        <th>Business Name</th>
                        <th>GST Number</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Download PDF</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <TableRow key={business._id} business={business} deleteItem={deleteItem} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Index;