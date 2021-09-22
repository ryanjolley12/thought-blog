const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        userEmail: {
            type: String,
            unique: true,
            required: true,
            // validation
            validate: {
              validator(trueEmail) {
                return /.+@.+\..+/.test(trueEmail);
              },
              message: 'Please enter a valid email address'
              }
        },

        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ],

        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
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
      )
      
// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;

  });

  const User = model('User', UserSchema)

module.exports = User;