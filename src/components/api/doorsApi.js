import axios from 'axios';

// IP de tu laptop Windows (la correcta de tu red local)
const API_URL = 'http://192.168.0.166:3000/doors';

export const getDoors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching doors:', error);
    throw error;
  }
};

export const toggleDoor = async (doorId) => {
  try {
    const response = await axios.post(`${API_URL}/${doorId}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling door:', error);
    throw error;
  }
};
