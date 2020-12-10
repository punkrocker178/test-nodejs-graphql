const graphql = require('graphql');
const Game = require('../models/game');
const Publisher = require('../models/publisher');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID } = graphql;

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        publisher: {
            type: PublisherType,
            resolve: (parent, args) => Game.findById(parent.publisherId)
        }
    })
});

const PublisherType = new GraphQLObjectType({
    name: 'publisher',
    fields: () => ({
        name: { type: GraphQLString },
        games: {
            type: GraphQLList(GameType),
            resolve: (parent, args) => {
                return Game.find({
                    publisherId: parent.id
                });
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPublisher: {
            type: PublisherType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                let publisher = new Publisher({
                    name: args.name
                });
                return publisher.save();
            }
        },
        addGame: {
            type: GameType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                publisherId: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                let game = new Game({
                    name: args.name,
                    genre: args.genre,
                    publisherId: args.publisherId
                });
                return game.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        game: {
            type: GameType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Game.findById(args.id);
            }
        },
        publisher: {
            type: PublisherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Publisher.findById(args.id);
            }
        },
        games: {
            type: GraphQLList(GameType),
            resolve: (parent, args) => Game.find({})
        },
        publishers: {
            type: GraphQLList(PublisherType),
            resolve: (parent, args) => Publisher.find({})
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})