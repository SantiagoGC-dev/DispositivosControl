import axios from 'axios';

// IP de tu laptop Windows (la correcta de tu red local)
const API_URL = 'http://192.168.0.166:3000/lights';

export const getLights = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lights:', error);
    throw error;
  }
};

export const toggleLight = async (lightId) => {
  try {
    const response = await axios.post(`${API_URL}/${lightId}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling light:', error);
    throw error;
  }
};
