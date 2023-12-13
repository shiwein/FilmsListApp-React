import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const API_BASE = "http://localhost:4000";

export const login = async (credentials) => {
  try {
    const response = await request.post(`${API_BASE}/api/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (invalid credentials)
      throw new Error("Invalid credentials");
    } else {
      // Handle other kinds of errors (network issues, server errors, etc.)
      throw new Error("Login failed");
    }
  }
};

export const register = async (credentials) => {
  try {
    const response = await request.post(
      `${API_BASE}/api/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (username already exists)
      throw new Error("Username already exists");
    } else {
      // Handle other kinds of errors
      throw new Error("Registration failed");
    }
  }
};

export const logout = async () => {
  const response = await request.post(`${API_BASE}/api/logout`);
  return response.data;
};

export const findReviewsByAuthor = async (authorId) => {
  const response = await fetch(`${API_BASE}/api/users/${authorId}/reviews`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMovieDetailsById = async (movieId) => {
  const response = await fetch(`${API_BASE}/api/movie/${movieId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export { updateUser };