import mongoose from "mongoose";
const { Schema, model } = mongoose;
/* 
1. The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
2. shld be able to update date field w [new Date("2022-01-22")]
--------------------
schema description
--------------------
klassName - name of class
members - learners registered/spsed to be attending this class. array spsed to contain learner_ids
attendance - array of objects. ea obj is attendance for a particular day. hence obj made up of date & attednded array. array spsed to contain learner_ids    
*/
const klassSchema = new Schema(
  {
    klassName: { type: String, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    attendance: [
      {
        date: Date,
        attended: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
  },
  { timestamps: true }
);

/* named model Klass rather than Class since Class is a special keyword in javascript */
export default model("Klass", klassSchema);

/*
-------------------------------------------
Sample code on referencing schemas
-------------------------------------------
var userSchema = new Schema({
    twittername: String,
    twitterID: Number,
    displayName: String,
    profilePic: String,
});

var  User = mongoose.model('User', userSchema) 

var postSchema = new Schema({
    name: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date,
    comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
});

var Post = mongoose.model('Post', postSchema);

Post.findOne({_id: 123})
.populate('postedBy')
.exec(function(err, post) {
    // do stuff with post
}); 

``````````````````````
Some explanations
``````````````````````
1. ref field means in which collection the id mentioned is going to be searched for.

*/
