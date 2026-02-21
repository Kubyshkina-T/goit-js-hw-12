import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = "54645920-7a588b5965485e203aa072a25";
const BASE_URL = "https://pixabay.com/api/";


export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 15,
                page
            },
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}