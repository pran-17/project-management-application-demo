const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema(

  {

    // LINK TO LOGIN USER

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },


    // STUDENT DETAILS

    name: {
      type: String,
      required: true,
      trim: true
    },


    registerNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },


    phone: {
      type: String,
      default: ''
    },


    department: {
      type: String,
      required: true
    },


    year: {
      type: String,
      default: ''
    },


    status: {
      type: String,
      default: 'Active'
    },


    guide: {
      type: String,
      default: 'Not Assigned'
    },


    project: {
      type: String,
      default: 'Not Assigned'
    },


    role: {
      type: String,
      default: 'student'
    }

  },

  {
    timestamps: true
  }

);


const Student =
  mongoose.models.Student ||
  mongoose.model(
    'Student',
    studentSchema
  );


module.exports = Student;