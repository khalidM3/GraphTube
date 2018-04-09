import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { videoType } from '../type/video';

// MODELS
import Video from '../model/video';
import User from '../model/user'

export const fetchVideo = {
	type: videoType,
	args: {
		id: { name: 'ID',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve: (root, params) => {
		return Video.findById(params.id).exec()
	}
}

export const fetchAllVideo = {
  type: new GraphQLList(videoType),
  resolve: () => {
    return Video.find().exec()
  }
}

export const fetchMyVideos = {
  type: new GraphQLList(videoType),
  args: {
    id: { name: 'ID', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: (root, args) => {
    return Video.fetchMyVideos(args.id)
  }
}

export const fetchWatchLater = {
	type: new GraphQLList(videoType),
	resolve: (root, args) => User.fetchWatchLater(args)
}

export const fetchWatchHistory = {
	type: new GraphQLList(videoType),
	resolve: (root, args) => User.fetchHistory(args)
}



export default { 
  fetchVideo, 
  fetchAllVideo, 
  fetchMyVideos, 
  fetchWatchLater, 
  fetchWatchHistory,
}