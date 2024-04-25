import { useState } from 'react';
import { registerUser } from '../services/userService';
import { useAuth } from '../components/useAuth';

export function useSignUp() {
    const [generalError, setGeneralError] = useState('');
    const { login } = useAuth();

    const submitData = async (formData) => {
        try {
            const result = await registerUser(formData);
            if (result.data.success) {
                login(result.data.token);
                return true; // Indicate success
            } else {
                setGeneralError('Registration failed.'); // Handle failure (e.g., invalid data)
                return false;
            }
        } catch (err) {
            // Handle server-side errors
            setGeneralError('An unexpected error occurred.');
            return false; // Indicate failure
        }
    };

    return { submitData, generalError };
}