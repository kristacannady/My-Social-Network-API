const { Schema, model } = require('mongoose');

const UserScehma = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true, 
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
      }
    ],
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

UserScehma.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserScehma);

module.export = User;