import { useState, useEffect } from 'react';
import { fetchAllBusinesses, deleteBusiness } from '../services/businessService';

export function useIndexBusiness(trigger) {
    const [businesses, setBusinesses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllBusinesses();
                setBusinesses(data);
            } catch (err) {
                setError('Error fetching businesses');
                setLoading(false);
            }
        };

        fetchData();
    }, [trigger]);

    const deleteItem = async (id) => {
        try {
            await deleteBusiness(id);
            const updatedBusinesses = businesses.filter(business => business._id !== id);
            setBusinesses(updatedBusinesses);
        } catch (err) {
            setError('Error deleting business');
        }
    };

    return { businesses, deleteItem, error };
}