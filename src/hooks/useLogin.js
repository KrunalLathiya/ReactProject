import { useState } from 'react';
import { loginUser } from '../services/userService';
import { useAuth } from '../components/useAuth';

export function useLogin() {
    const [generalError, setGeneralError] = useState('');
    const { login } = useAuth();

    const submitData = async (formData) => {
        try {
            const result = await loginUser(formData);
            if (result.data.success) {
                login(result.data.token);
                return true;
            } else {
                setGeneralError('Login failed.');
                return false;
            }
        } catch (err) {
            setGeneralError('An unexpected error occurred.');
            return false;
        }
    };

    return { submitData, generalError };
}