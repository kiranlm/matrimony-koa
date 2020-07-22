const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const MatchType = require('./matchType');
const match = require('../models/match');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    match: {
      type: MatchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return match.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
