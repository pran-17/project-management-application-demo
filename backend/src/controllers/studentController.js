const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// ============================================
// CREATE STUDENT + CREATE LOGIN ACCOUNT
// ============================================

const createStudent = async (req, res) => {

  try {

    const {
      name,
      registerNumber,
      email,
      password,
      phone,
      department,
      year,
      status,
      guide,
      project
    } = req.body;


    // CHECK REQUIRED FIELDS

    if (
      !name ||
      !registerNumber ||
      !email ||
      !password ||
      !department
    ) {

      return res.status(400).json({
        message: 'Please fill all required fields'
      });

    }


    // NORMALIZE EMAIL

    const normalizedEmail =
      email.trim().toLowerCase();


    // CHECK EXISTING STUDENT

    const existingStudent =
      await Student.findOne({

        $or: [
          { email: normalizedEmail },
          { registerNumber: registerNumber.trim() }
        ]

      });


    if (existingStudent) {

      return res.status(400).json({
        message:
          'Student with this email or register number already exists'
      });

    }


    // CHECK EXISTING LOGIN USER

    const existingUser =
      await User.findOne({
        email: normalizedEmail
      });


    if (existingUser) {

      return res.status(400).json({
        message:
          'A user with this email already exists'
      });

    }


    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // ============================================
    // CREATE LOGIN USER
    // Password is stored ONLY in User collection
    // ============================================

    const user = await User.create({

      name: name.trim(),

      email: normalizedEmail,

      password: hashedPassword,

      role: 'student'

    });


    // ============================================
    // CREATE STUDENT PROFILE
    // NO PASSWORD HERE
    // ============================================

    const student = await Student.create({

      userId: user._id,

      name: name.trim(),

      registerNumber:
        registerNumber.trim(),

      email: normalizedEmail,

      phone:
        phone?.trim() || '',

      department,

      year:
        year || '',

      status:
        status || 'Active',

      guide:
        guide || 'Not Assigned',

      project:
        project || 'Not Assigned',

      role: 'student'

    });


    res.status(201).json({

      message:
        'Student created successfully and login account created',

      student: {

        id: student._id,

        userId: user._id,

        name: student.name,

        registerNumber:
          student.registerNumber,

        email: student.email,

        phone: student.phone,

        department:
          student.department,

        year: student.year,

        status: student.status,

        guide: student.guide,

        project: student.project,

        role: student.role

      }

    });


  } catch (error) {

    console.error(
      'Create student error:',
      error
    );

    res.status(500).json({

      message:
        error.message ||
        'Failed to create student'

    });

  }

};


// ============================================
// GET ALL STUDENTS
// ============================================

const getStudents = async (req, res) => {

  try {

    const students =
      await Student.find()
        .sort({
          createdAt: -1
        });


    res.status(200).json(
      students
    );


  } catch (error) {

    console.error(
      'Get students error:',
      error
    );

    res.status(500).json({

      message:
        'Failed to fetch students'

    });

  }

};


// ============================================
// GET SINGLE STUDENT
// ============================================

const getStudentById = async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        message:
          'Student not found'

      });

    }


    res.status(200).json(
      student
    );


  } catch (error) {

    console.error(
      'Get student error:',
      error
    );

    res.status(500).json({

      message:
        'Failed to fetch student'

    });

  }

};


// ============================================
// UPDATE STUDENT
// ============================================

const updateStudent = async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        message:
          'Student not found'

      });

    }


    const {
      name,
      registerNumber,
      email,
      phone,
      department,
      year,
      status,
      guide,
      project
    } = req.body;


    // UPDATE STUDENT FIELDS

    if (name !== undefined) {

      student.name =
        name.trim();

    }


    if (registerNumber !== undefined) {

      student.registerNumber =
        registerNumber.trim();

    }


    if (email !== undefined) {

      student.email =
        email.trim().toLowerCase();

    }


    if (phone !== undefined) {

      student.phone =
        phone.trim();

    }


    if (department !== undefined) {

      student.department =
        department;

    }


    if (year !== undefined) {

      student.year =
        year;

    }


    if (status !== undefined) {

      student.status =
        status;

    }


    if (guide !== undefined) {

      student.guide =
        guide;

    }


    if (project !== undefined) {

      student.project =
        project;

    }


    // SAVE STUDENT PROFILE

    await student.save();


    // UPDATE LOGIN USER

    if (student.userId) {

      await User.findByIdAndUpdate(

        student.userId,

        {

          name:
            student.name,

          email:
            student.email

        },

        {
          new: true
        }

      );

    }


    res.status(200).json({

      message:
        'Student updated successfully',

      student

    });


  } catch (error) {

    console.error(
      'Update student error:',
      error
    );

    res.status(500).json({

      message:
        error.message ||
        'Failed to update student'

    });

  }

};


// ============================================
// DELETE STUDENT + LOGIN ACCOUNT
// ============================================

const deleteStudent = async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        message:
          'Student not found'

      });

    }


    // DELETE LOGIN ACCOUNT

    if (student.userId) {

      await User.findByIdAndDelete(
        student.userId
      );

    } else {

      // SUPPORT OLD STUDENT RECORDS

      await User.findOneAndDelete({

        email:
          student.email

      });

    }


    // DELETE STUDENT PROFILE

    await Student.findByIdAndDelete(
      student._id
    );


    res.status(200).json({

      message:
        'Student and login account deleted successfully'

    });


  } catch (error) {

    console.error(
      'Delete student error:',
      error
    );

    res.status(500).json({

      message:
        'Failed to delete student'

    });

  }

};


// ============================================
// EXPORT
// ============================================

module.exports = {

  createStudent,

  getStudents,

  getStudentById,

  updateStudent,

  deleteStudent

};