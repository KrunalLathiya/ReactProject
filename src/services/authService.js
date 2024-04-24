import { jwtDecode } from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    if (token) {
        try {
            const decodedToken = jwtDecode(token); // Decode the JWT token
            const currentTime = Date.now() / 1000; // Get current time in seconds
                if (decodedToken.exp > currentTime) {
                // Token is valid and not expired
                return true;
            } else {
                // Token is expired, perform logout or refresh token
                // Example: logoutUser();
                return false;
            }
        } catch (error) {
            // Error decoding token, token is invalid
            // Example: logoutUser();
            return false;
        }
    } else {
        // No token found, user is not authenticated
        return false;
    }
};

export default isAuthenticated;