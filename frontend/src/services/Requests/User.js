import fetch from "axiosConfig/FetchInterceptor";

const UserRequest = {};
const user = "users";

UserRequest.addAUser = (data) => {
    return fetch({
        url: user,
        method: "post",
        data: data,
    });
};

UserRequest.getAllUsers = (params) => {
    return fetch({
        url: user,
        method: "get",
        params: params,
    });
};

UserRequest.getAUser = (id) => {
    return fetch({
        url: `${user}/${id}`,
        method: "get",
    });
};

UserRequest.updateAUser = (id, data) => {
    return fetch({
        url: `${user}/${id}`,
        method: "put",
        data: data,
    });
};

UserRequest.deleteAUser = (id) => {
    return fetch({
        url: `${user}/${id}`,
        method: "delete",
    });
};

// New methods for adding and deducting points ------------ NEW--------------------------------
UserRequest.addLoyaltyPoints = (userId, points) => {
    const token = localStorage.getItem('adminAuthToken');
    return fetch({
        url: `users/${userId}/add-loyalty-points`,
        method: 'patch',
        data: { points },
        headers: {
            'Authorization': `Bearer ${token}` // Add Authorization header
        }
    });
};

UserRequest.deductLoyaltyPoints = (userId, points) => {
    const token = localStorage.getItem('adminAuthToken');
    return fetch({
        url: `users/${userId}/deduct-loyalty-points`,
        method: 'patch',
        data: { points },
        headers: {
            'Authorization': `Bearer ${token}` // Add Authorization header
        }
    });
};


UserRequest.loginUser = async (formData) => {
    try {
        const response = await fetch({
            url: `${user}/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: formData,
        });

        if (response.status !== 200) {
            // Handle non-ok responses
            if (response.data.message) {
                throw new Error(response.data.message);
            } else {
                throw new Error('Network response was not ok');
            }
        }

        return response.data;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};


UserRequest.logoutUser = async () => {
    try {
        const response = await fetch(`${user}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        console.log("response", response);
        console.log("response.data", response.data);

        if (!response.data?.success) {
            throw new Error(response.data?.message || 'Logout failed');
        }

        localStorage.clear();

        return response.data; // ✅ return success message back to the component
    } catch (error) {
        console.error('An error occurred during logout:', error.message);
        throw error;
    }
};






export default UserRequest;
