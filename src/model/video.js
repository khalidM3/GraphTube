'use strict'

// DEPENDECIES
import User from './user'
import createError from 'http-errors'
import Mongoose, {Schema} from 'mongoose'

// SCHEMA
const videoSchema =  new Schema({
  uid: {type: Schema.Types.ObjectId, required: true, ref:'user'},
  title : {type: String, required: true },
  desc : {type: String, default: '' },
  videoSRC : {type: String, required: true },
  likes:[{type: Schema.Types.ObjectId, ref: 'user'}],
  dislikes:[{type: Schema.Types.ObjectId, ref: 'user'}],
})

// MODEL
const Video = Mongoose.model('video', videoSchema)

// STATIC METHODS
Video.create = function(data) {
  return User.findById(data.uid)
  .then( user => {
    if(!user) throw new createError(401, 'There is not user with that id')
    return new Video({
      uid: user._id,
      title: data.title,
      desc: data.desc,
      videoSRC: data.videoSRC,
    }).save()
  })
}

Video.fetchMyVideos = function(id) {
  return Video.find({uid: id})
}

Video.like = function(data) {
  return Video.findById(data.id)
  .then( video => {
    let liked = video.likes.some(id => id.toString() == data.user)

    if(liked) video.likes = video.likes.filter(id => id.toString() !== data.user)
    else video.likes.push(data.user)

    video.dislikes = video.dislikes.filter(id => id.toString() !== data.user)
    return video.save()
  })
}

Video.dislike = function(data) {
  return Video.findById(data.id)
  .then( video => {
    let disliked = video.dislikes.some(id => id.toString() == data.user)

    if(disliked) video.dislikes = video.dislikes.filter(id => id.toString() !== data.user)
    else video.dislikes.push(data.user)
    
    video.likes = video.likes.filter(id => id.toString() !== data.user)
    return video.save()
  })
}

Video.update = function(args) {
  return Video.findById(args.id)
  .then( video => {
    let owner = video.uid.toString() == args.user
    if(!owner) throw new createError(401, 'You are not the owner of the video')
    return Video.findByIdAndUpdate(args.id, {...args.data}, {new: true})
  })
}

Video.delete = function(args) {
  return Video.findById(args.id)
  .then( video => {
    let owner = video.uid.toString() == args.uid
    if(!owner) throw new createError(401, 'You are not the owner of the video')
    return Video.findByIdAndRemove(args.id)
  })
}


// INTERFACE
export default Video

