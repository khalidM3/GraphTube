# GraphTube
GraphTube is a api built on GraphQL, Node, express and Mongoose, that lets you 
post videos, like and dislike them, follow other user and much more
### Getting started
##### Requirements
This api uses a Mongodb database, so you will need one in order to use it.

##### Download

First clone the repository 
```sh
$ git clone https://github.com/khalidM3/GraphTube.git
```

##### Set up

Install the dependencies and devDependencies and start the server.

```sh
$ yarn install
```
create a .env file and add the following properties
```
MONGODB_URI='mongodb://localhost/graphtube'
PORT='3000'

```

##### start the server

```sh
$ node start
```
Now you can make requests to `localhost:3000`

### Models
There are two models in this api
1. User
2. Video

### Types
 There are Four graphQL types in this api 

1. User
2. UserInput
3. Video
4. VideoInput

### Queries
There are nine queries in total

#### Fields
1. fetchAllUsers
    * this query gets all the users in the database
    * type: User

2. fetchUser(id: ID!)
    * this query gets a specified user
    * type: User
    * arguments:
        1. id : id of the user that is being fetched

3. fetchFollowers(id: ID!)
    * this query gets a users followers
    * type: User
    * arguments:
        1. id : id of the user 

3. fetchFollowing(id: ID!)
    * This query fetches a users following
    * type: User
    * arguments:
        1. id : id of the user

4. fetchVideo(id: ID!)
    * This query fetches a video by its id
    * type: Video
    * arguments:
        1. id : id of the video to fetch
        
5. fetchAllVideo
    * This query fetches all the users in the db
    * type: Video

6. fetchMyVideos(id: ID!)
    * This query fetches all the videos a user posted
    * type: Video
    * arguments:
        1. id : id of the user making the request

7. fetchWatchLater: [Video]
    * This query fetches all the videos a saved for later
    * type: Video
    * arguments:
        1. id : id of the user making request

8. fetchWatchHistory: [Video]
    * This query fetches all the videos the user watched
    * type: Video
    * arguments:
        1. id : id of the user making the request

### Mutations
  There are 12 mutations in this app

#### Fields

 1. userAdd(data: UserInput!)
    * type: User
    * arguments
        1. data

2. userFollow(id: ID!uid: String!)
    * type: User
    * arguments:
        1. id : id of the user that is being followed
        2. uid: id of the user that is following
  
3. userUpdate(id: ID!data: UserInput!)
    * type: User
    * arguments: 
        1. id : id of the user being updated
        2. data : the updated user

4. userDelete(id: ID!)
    * type: User
    * arguments:
        1. id: id of the user being deleted

5. addToWatchLater(id: ID!uid: String!)
    * type: User
    * arguments: 
        1. id: id of the video to added to watch later
        2. uid: id of the user who  wants to watch later

6. addToWatchHistory(id: ID!uid: String!)
    * type: User
    * arguments:
        1. id : id of the video to added to watch history
        2. uid: the id of user of the history the video is being added to 

7. clearWatchHistory(id: ID!uid: String!)
    * type: User
    * arguments:
        1. uid : the id of the user whos history is being cleared

8. addVideo(data: VideoInput!)
    * type: video
    * arguments:
        1. data : the data of the video

9. likeVideo(id: ID! user: String!)
    * type: video
    * arguments:
        1. id : the id of the video to liked
        2. user : the id of the user making the request

10. dislikeVideo(id: ID!user: String!)
    * type: video
    * arguments:
        1. id : the id of the video to disliked
        2. user : the id of the user making the request

11. updateVideo(id: ID!user: String!data: VideoInput!)
    * type: video
    * arguments: 
        1. id : the id of the video to update
        2. user: the id of the user making the request
        3. data : the updated video

12. deleteVideo(id: ID!uid: String!)
    * type: video
    * arguments:
        1. id : the id of the video to delete
        2. uid : the id of the user making the request



