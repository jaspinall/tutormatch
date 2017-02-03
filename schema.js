import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt
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
      name: {
        type: GraphQLString,
        resolve(tutor) {
          return `${tutor.firstName} ${tutor.lastName}`;
        }
      },
      email: {
        type: GraphQLString,
        resolve(tutor) {
          return tutor.email;
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
      tutorID: {
        type: GraphQLString,
        resolve(rating) {
          return rating.tutorId;
        }
      },
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
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.tutor.findAll({where: args});
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema;
