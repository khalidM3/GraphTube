import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
  GraphQLInt,
	GraphQLID,
	GraphQLList
} from 'graphql'


export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type:  new GraphQLNonNull(GraphQLString)},
    email: {type:  new GraphQLNonNull(GraphQLString)},
    age: {type:  new GraphQLNonNull(GraphQLInt)},
    followers: { type: new GraphQLList(GraphQLString)},
    following: { type: new GraphQLList(GraphQLString)},
    watchLater: { type: new GraphQLList(GraphQLString)},
    watchHistory: { type: new GraphQLList(GraphQLString)}, 
  })
})

export const userInputType = new GraphQLInputObjectType({
	name: 'UserInput',
	fields: () => ({
    name: {type: GraphQLString},
		email: {type: GraphQLString},
    age: {type: GraphQLInt},
	})
})