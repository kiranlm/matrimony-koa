const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const MatchType = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    place: { type: GraphQLString },
    dob: { type: GraphQLString },
    caste: { type: GraphQLString },
    verificationId: { type: GraphQLString },
  }),
});

module.exports = MatchType;
