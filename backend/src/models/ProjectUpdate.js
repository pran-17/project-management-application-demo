const mongoose = require('mongoose');

const projectUpdateSchema = new mongoose.Schema(
  {

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    phase: {
      type: String,
      default: ''
    },

    progress: {
      type: Number,
      default: 0
    },

    submittedBy: {
      type: String,
      default: 'student'
    },

    teacherReview: {
      type: String,
      default: ''
    },

    reviewStatus: {
      type: String,
      enum: [
        'Pending',
        'Approved',
        'Needs Changes'
      ],
      default: 'Pending'
    }

  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model(
  'ProjectUpdate',
  projectUpdateSchema
);