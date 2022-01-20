import mongoose from 'mongoose';

/**
 *  UserSchema
 *  TODO: Add support for third-party applications (eg Discord, Twitch..)
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
