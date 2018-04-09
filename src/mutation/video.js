import {
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
} from 'graphql';

import { videoType, videoInputType } from '../type/video';
import Video from '../model/video';

export const addVideo =  {
	type: videoType,
	args: {
		data: { name: 'data', type: new GraphQLNonNull(videoInputType)}
	},
	resolve: (root, params) => Video.create(params.data)
}

export const likeVideo = {
	type: videoType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		user: { name: 'USER', type: new GraphQLNonNull(GraphQLString)}
	},
	resolve: (root, params) => Video.like(params)
}

export const dislikeVideo = {
	type: videoType,
	args: {
		id: { name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		user: { name: 'USER', type: new GraphQLNonNull(GraphQLString)}
	},
	resolve: (root, params) => Video.dislike(params)
}

export const updateVideo = {
	type: videoType,
	args: {
		id: {name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		user: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
		data: { name: 'DATA', type: new GraphQLNonNull(videoInputType)}
	},
	resolve: (root, args) => Video.update(args)
}

export const deleteVideo = {
	type: videoType,
	args: {
		id: {name: 'ID', type: new GraphQLNonNull(GraphQLID)},
		uid: { name: 'USER', type: new GraphQLNonNull(GraphQLString)},
	},
	resolve: (root, args) => Video.delete(args)
}



export default {
	addVideo, 
	likeVideo, 
	dislikeVideo,
	updateVideo,
	deleteVideo,
}