const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

let games = [
    {name: 'Cyberpunk 2077', id: '1', genre: 'RPG', publisherId: '1'},
    {name: 'The Witcher 3: Wild Hunt', id: '2', genre: 'RPG', publisherId: '1'},
    {name: '7 Days To Die', id: '3', genre: 'Survival', publisherId: '2'}
]

let publishers = [
    {id: '1', name: 'CD Projek Red'},
    {id: '2', name: 'The Fun Pimps'}
]

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        publisher: {
            type: PublisherType,
            resolve: (parent, args) => publishers.find(publisher => publisher.id == parent.publisherId)
        }
    })
});

const PublisherType = new GraphQLObjectType({
    name: 'publisher',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        games: {
            type: GraphQLList(GameType),
            resolve: (parent, args) => {
                return games.filter(game => game.publisherId == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        game: {
            type: GameType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return games.find(game => game.id == args.id);
            }
        },
        publisher: {
            type: PublisherType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return publishers.find(publisher => publisher.id == args.id);
            }
        },
        games: {
            type: GraphQLList(GameType),
            resolve: (parent, args) => games
        },
        publishers: {
            type: GraphQLList(PublisherType),
            resolve: (parent, args) => publishers
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery 
})