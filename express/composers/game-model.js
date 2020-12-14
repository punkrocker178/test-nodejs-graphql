const { schemaComposer } = require('graphql-compose');

const GameModelTC = schemaComposer.createObjectTC({
    name: 'GameModel',
    fields: {
        name: 'String',
        ratings: 'Float',
        ratingsCount: 'Int',
        category: 'String',
        releaseDate: 'String',
        summary: 'String',
        publishers: 'String',
        url: 'String',
        image: 'String'
    }
});

module.exports = GameModelTC;