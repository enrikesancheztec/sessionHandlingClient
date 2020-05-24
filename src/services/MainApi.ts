import axios from 'axios';

const MainAPI = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json'
});

export default MainAPI;