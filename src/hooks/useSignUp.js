import { useState } from 'react';
import { registerUser } from '../services/userService';

export function useSignUp() {
    const [generalError, setGeneralError] = useState('');

    const submitData = async (formData) => {
        try {
            const result = await registerUser(formData);
            if (result.data.success) {
                localStorage.setItem("token", result.data.token);
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