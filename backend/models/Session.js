// backend/models/Session.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
    {
      sessionName: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Session', SessionSchema);
