import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
  GraphQLInt,
	GraphQLID,
	GraphQLList
} from 'graphql'

import userType from './user'

export const videoType = new GraphQLObjectType({
  name: 'Video',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLID)},
    uid: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    desc: {type: GraphQLString},
    videoSRC: {type:  new GraphQLNonNull(GraphQLString)},
    likes: { type: new GraphQLList(GraphQLString)},
    dislikes: { type: new GraphQLList(GraphQLString)}, 
  })
})

export const videoInputType = new GraphQLInputObjectType({
	name: 'VideoInput',
	fields: () => ({
    uid: {type: GraphQLString},
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    videoSRC: {type: GraphQLString},
	})
})