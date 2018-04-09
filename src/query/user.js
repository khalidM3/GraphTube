import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import { userType } from '../type/user';
import User from '../model/user';

export const fetchUser = {
	type: userType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID) }
	},
	resolve: (root, params) => User.findById(params.id).exec()
}

export const fetchAll = {
  type: new GraphQLList(userType),
  resolve: () => User.find().exec()
}


export default { fetchAll, fetchUser}