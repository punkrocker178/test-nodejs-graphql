const axios = require('axios');
const gameModel = require('../models/game-model');

const axiosClient = axios.default;

const endpoint = 'https://api.rawg.io/api';

const apiKey = '2b809fde8c4c417caddec876b4f4244a';

const getGames = () => {
    axiosClient.get(`${endpoint}/games`, {
        params: {
            key: apiKey
        }
    }).then((res) => {
        const data = res.data.results;
        const arr = [];
        data.forEach(game => {
            let model = gameModel;
            model.name = game.name;
            model.ratings = game.rating;
            model.ratingsCount;
            model.releaseDate = game.released;
            model.image = game.background_image;
            model.category = game.genres;
            arr.push(model);
            console.log(model);
        });
        
    });
}

module.exports = {getGames};