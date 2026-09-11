const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    employeeId: {
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

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ''
    },

    department: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      default: ''
    },

    specialization: {
      type: String,
      default: ''
    },

    students: {
      type: Number,
      default: 0
    },
    role: { 
      type: String,
      default: 'teacher'
    },

    projects: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);


// IMPORTANT: Prevent Teacher model from being compiled twice

const Teacher =
  mongoose.models.Teacher ||
  mongoose.model('Teacher', teacherSchema);


module.exports = Teacher;