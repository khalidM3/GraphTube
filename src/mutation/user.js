import {
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
} from 'graphql';

import { userType, userInputType } from '../type/user';
import User from '../model/user';

export const userAdd = {
	type: userType,
	args: {
		data: { name: 'data', type: new GraphQLNonNull(userInputType)}
	},
	resolve: (root, args) => User.create(args.data)
}

export const userFollow = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		uid: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, args) => User.follow(args)
}

export const addToWatchLater = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		uid: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, args) => User.addToWatchLater(args)
}

export const addToWatchHistory = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		uid: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, args) => User.addToWatchHistory(args)
}

export const clearWatchHistory = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		uid: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, args) => User.clearWatchHistory(args)
}


export const userUpdate = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		data: { name: 'data', type: new GraphQLNonNull(userInputType)}
	},
	resolve: (root, args) => User.update(args)
}

export const userDelete = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
	},
	resolve: (root, args) => User.delete(args)
}

export default {
	userAdd,
	userFollow,
	userUpdate,
	userDelete,
	addToWatchLater,
	addToWatchHistory,
	clearWatchHistory,
	}
