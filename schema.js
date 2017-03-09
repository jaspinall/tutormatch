import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import Db from './db';

const Tutor = new GraphQLObjectType({
  name: 'Tutor',
  description: 'This represents a tutor',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(tutor) {
          return tutor.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(tutor) {
          return tutor.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(tutor) {
          return tutor.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(tutor) {
          return tutor.email;
        }
      },
      ratings: {
        type: new GraphQLList(Rating),
        resolve(tutor) {
          return tutor.getRatings();
        }
      }
    }
  }
});

const Rating = new GraphQLObjectType({
  name: 'Rating',
  description: 'This represents a rating',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(rating) {
          return rating.id;
        }
      },
      rating: {
        type: GraphQLString,
        resolve(rating) {
          return rating.rating;
        }
      },
      tutorId: {
        type: GraphQLString,
        resolve(rating) {
          return rating.tutorId;
        }
      },
      tutor: {
        type: Tutor,
        resolve(rating) {
          return rating.getTutor();
        }
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields: () => {
    return {
      tutors: {
        type: new GraphQLList(Tutor),
        args: {
          id: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.tutor.findAll({where: args});
        }
      },
      ratings: {
        type: new GraphQLList(Rating),
        args: {
          id: {
            type: GraphQLString
          },
          rating: {
            type: GraphQLString
          },
          tutorId: {
            type: GraphQLString
          },
        },
        resolve(root, args) {
          return Db.models.rating.findAll({where: args});
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create data',
  fields: () => {
    return {
      addTutor: {
        type: Tutor,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args) {
          return Db.models.tutors.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
          })
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema;
