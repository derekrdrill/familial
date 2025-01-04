const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: [Date],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    invitedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    attendingUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    declinedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    photoAlbum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
    time: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Event = mongoose.models?.event || mongoose.model('event', EventSchema);
export default Event;
