const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ''
    },

    department: {
      type: String,
      default: ''
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],

    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },

    status: {
      type: String,
      default: 'Not Started'
    },

    progress: {
      type: Number,
      default: 0
    }

  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model(
  'Project',
  projectSchema
);