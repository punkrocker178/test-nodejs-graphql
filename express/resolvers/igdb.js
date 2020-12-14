const axios = require('axios');
const GameModel = require('../models/game-model');

const axiosClient = axios.default;

const endpoint = 'https://api.igdb.com/v4';

const apiKey = 'Bearer e8r5s8976vkk28uczbp0o7wdnm59yr';
const body = 'fields  id, artworks, name, category, first_release_date, rating, rating_count, storyline, summary, involved_companies, url; limit 10;';

const getGames = async () => {
    return await axiosClient.post(`${endpoint}/games`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Client-ID': '0w080ulcr3vx3zkucblw9ze24eihme',
            'Authorization': apiKey,
        }
    }).then(res => {
        const data = res.data;
        if (data.length > 0) {
            const arr = [];
            data.forEach(game => {
                let model = new GameModel();
                model.name = game.name;
                model.ratings = game.rating;
                model.ratingsCount = game.rating_count;
                model.releaseDate = game.first_release_date;
                model.summary = game.summary;
                model.url = game.url;
                model.image = game.artworks;
                model.category = game.category;
                arr.push(model);
            });

            return arr;
        }
    })
        .catch(err => console.log(err));
}

module.exports = { getGames };