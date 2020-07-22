const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const MatchType = require('./matchType');
const Match = require('../models/match');
const Mutations = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    all: {
      type: MatchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Match.find({});
      },
    },
    match: {
      type: MatchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Match.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
