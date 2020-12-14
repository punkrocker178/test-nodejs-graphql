const graphql = require('graphql');
const Game = require('../models/game');
const Publisher = require('../models/publisher');
const { schemaComposer } = require('graphql-compose');
const GameModel = require('../models/game-model');
const GameModelTC = require('../composers/game-model');
const getGamesResovler = require('../resolvers/game-resolver');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID } = graphql;

/* --- GraphQL compose --- */

const GameTC = schemaComposer.createObjectTC({
    name: 'Game',
    fields: {
        name: 'String',
        genre: 'String',
        publisherId: 'String'
    }
});

const PublisherTC = schemaComposer.createObjectTC({
    name: 'Publisher',
    fields: {
        name: 'String',
    }
})

GameTC.addFields({
    publisher: {
        type: PublisherTC,
        resolve: (parent, args) => Publisher.findById(parent.publisherId)
    }
})

PublisherTC.addFields({
    games: {
        type: [GameTC],
        resolve: (parent, args) => Game.find({
            publisherId: parent.id
        })
    }
})

GameModelTC.addResolver({
    name: 'FindManyGames',
    type: [GameModelTC],
    args: {
        apiParty: 'String'
    },
    resolve: async (resolveParams) => {
        const res = await getGamesResovler(resolveParams.args.apiParty);
        return res;
    }
});

schemaComposer.Query.addFields({
    gameAPI: GameModelTC.getResolver('FindManyGames'),
    games: {
        type: [GameTC],
        resolve: () => Game.find({})
    },
    publishers: {
        type: [PublisherTC],
        resolve: () => Publisher.find({})
    },
    game: {
        type: GameTC,
        args: {
            id: 'String'
        },
        resolve: (_, args) => Game.findById(args.id)
    },
    publisher: {
        type: PublisherTC,
        args: {
            id: 'String'
        },
        resolve: (_, args) => Publisher.findById(args.id)
    }
});

const mutationQueries = {
    addPublisher: {
        type: PublisherTC,
        args: {
            name: 'String'
        },
        resolve: (parent, args) => {
            let publisher = new Publisher({
                name: args.name
            });
            return publisher.save();
        }
    },
    addGame: {
        type: GameTC,
        args: {
            name: 'String',
            genre: 'String',
            publisherId: 'String'
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

schemaComposer.Mutation.addFields(mutationQueries);


/* --- Basic GraphQL --- */
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

// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// })

module.exports = schemaComposer.buildSchema()
