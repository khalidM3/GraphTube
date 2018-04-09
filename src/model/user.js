'use strict'

// DEPENDECIES
import createError from 'http-errors'
import Mongoose, {Schema} from 'mongoose'

// SCHEMA
const userSchema =  new Schema({
  name : {type: String, required: true },
  email : {type: String, required: true },
  age : {type: Number, required: true },
  followers :[{type: Schema.Types.ObjectId, ref: 'user'}],
  following :[{type: Schema.Types.ObjectId, ref: 'user'}],

  watchLater:[{type: Schema.Types.ObjectId, ref: 'video'}],
  watchHistory:[{type: Schema.Types.ObjectId, ref: 'video'}],
})

// MODEL
const User = Mongoose.model('user', userSchema)

// STATIC METHODS
User.create = function(data) {
  return new User({
    name: data.name,
    email: data.email,
    age: data.age,
  }).save()
}

User.follow = function(data) {
  return User.findById(data.id)
  .then( user => {
    let following = user.followers.some(id => id.toString() == data.uid)

    if(following) user.followers = user.followers.filter(id => id.toString() !== data.uid)
    else user.followers.push(data.uid)

    return user.save()
  })
  .then( user => {
    return User.findById(data.uid)
    .then( me => {
      let following = user.followers.some(id => id.toString() == data.uid)
      if(following) me.following.push(user._id)
      else me.following = me.following.filter(id => id.toString() !== user._id.toString())

      return me.save()
    })
  })
}

User.addToWatchLater = function(data) {
  return User.findById(data.uid)
  .then( user => {
    let added = user.watchLater.some(id => id.toString() == data.id)
    if(added) user.watchLater = user.watchLater.filter(id => id.toString() !== data.id)
    else user.watchLater.push(data.id)

    return user.save()
  })
}

User.addToWatchHistory = function(data) {
  return User.findById(data.uid)
  .then( user => {
    let length = user.watchHistory.length -1
    let lastWatched = user.watchHistory[length]
    let watched = lastWatched ? lastWatched.toString() == data.id : false
    if(!watched) user.watchHistory.push(data.id)
    return user.save()
  })
}

User.clearWatchHistory = function(data) {
  return User.findById(data.uid)
  .then( user => {
    user.watchHistory = []
    return user.save()
  })
}

User.fetchHistory = function(data) {
  return User.findById(data.uid)
  .populate('watchHistory')
  .then( user => {
    return user.watchHistory
  })
}

User.fetchWatchLater = function(data) {
  return User.findById(data.uid)
  .populate('watchLater')
  .then( user => {
    return user.watchLater
  })
}

User.fetchFollowers = function(data) {
  return User.findById(data.uid)
  .populate('followers')
  .then( user => {
    return user.followers
  })
}

User.fetchFollowing = function(data) {
  return User.findById(data.uid)
  .populate('following')
  .then( user => {
    return user.following
  })
}

User.update = function(args) {
  return User.findByIdAndUpdate(args.id, {...args.data}, {new: true})
}

User.delete = function(args) {
  return User.findByIdAndRemove(args.id)
}

// INTERFACE
export default User

