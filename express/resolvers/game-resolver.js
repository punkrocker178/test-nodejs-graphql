const rawg = require('./rawg');
const igdb = require('./igdb');

 const getGames = async (apiParty) => {
     let res = [];
        if (apiParty == 'rawg') {
            res = await rawg.getGames();
        }
        
        if (apiParty == 'igdb') {
            res =  await igdb.getGames();
        }
        
        return res;

}

module.exports = getGames;