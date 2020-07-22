const { GraphQLObjectType, GraphQLString } = require('graphql');
const MatchType = require('./matchType');
const Match = require('../models/match');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMatch: {
      type: MatchType,
      args: {
        name: { type: GraphQLString },
        place: { type: GraphQLString },
        dob: { type: GraphQLString },
        caste: { type: GraphQLString },
        verificationId: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newMatch = new Match({
          name: args.name,
          place: args.place,
          dob: args.dob,
          caste: args.caste,
          verificationId: args.verificationId,
        });

        return newMatch.save();
      },
    },
    updateMatch: {
      type: MatchType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        place: { type: GraphQLString },
        dob: { type: GraphQLString },
        caste: { type: GraphQLString },
        verificationId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Match.findById(args.id)
          .then((match) => {
            match.name = args.name;
            (match.place = args.place),
              (match.dob = args.dob),
              (match.caste = args.caste),
              (match.verificationId = args.verificationId);

            return match.save();
          })
          .then((updatedMatch) => updatedMatch)
          .catch((err) => console.log(err));
      },
    },
    removeMatch: {
      type: MatchType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Match.findOneAndDelete(args.id)
          .exec()
          .then((match) => match.remove())
          .then((deletedMatch) => deletedMatch)
          .catch((err) => console.log(err));
      },
    },
  },
});

module.exports = Mutation;
