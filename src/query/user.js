import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

// TYPES
import { userType } from '../type/user';

// MODELS
import User from '../model/user';

// QUERIES
export const fetchAllUsers = {
  type: new GraphQLList(userType),
  resolve: () => User.find().exec()
}

export const fetchUser = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID) }
	},
	resolve: (root, params) => User.findById(params.id).exec()
}

export const fetchFollowers = {
	type: new GraphQLList(userType),
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID) }
	},
  resolve: (root, args) => User.fetchFollowers(args)
}

export const fetchFollowing = {
	type: new GraphQLList(userType),
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID) }
	},
  resolve: (root, args) => User.fetchFollowing(args)
}


export default { 
	fetchAllUsers, 
	fetchUser,
	fetchFollowers,
	fetchFollowing
}