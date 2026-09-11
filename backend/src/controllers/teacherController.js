const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');


const createTeacher = async (
  req,
  res
) => {

  try {

    const teacherData = req.body;

    const existingTeacher =
      await Teacher.findOne({

        $or: [
          {
            email:
              teacherData.email
          },
          {
            employeeId:
              teacherData.employeeId
          }
        ]

      });


    if (existingTeacher) {

      return res.status(400).json({

        message:
          'Teacher already exists'

      });

    }


    teacherData.password =
      await bcrypt.hash(
        teacherData.password,
        10
      );


    const teacher =
      await Teacher.create(
        teacherData
      );


    res.status(201).json({

      message:
        'Teacher created successfully',

      teacher

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        'Failed to create teacher'

    });

  }

};


const getTeachers = async (
  req,
  res
) => {

  try {

    const teachers =
      await Teacher.find()
        .select('-password')
        .populate(
          'students',
          'name registerNumber'
        )
        .populate(
          'projects',
          'title'
        );


    res.json(teachers);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get teachers'

    });

  }

};


const getTeacherById = async (
  req,
  res
) => {

  try {

    const teacher =
      await Teacher.findById(
        req.params.id
      )
        .select('-password')
        .populate('students')
        .populate('projects');


    if (!teacher) {

      return res.status(404).json({

        message:
          'Teacher not found'

      });

    }


    res.json(teacher);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get teacher'

    });

  }

};


const updateTeacher = async (
  req,
  res
) => {

  try {

    const teacher =
      await Teacher.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      )
        .select('-password');


    res.json({

      message:
        'Teacher updated successfully',

      teacher

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to update teacher'

    });

  }

};


const deleteTeacher = async (
  req,
  res
) => {

  try {

    await Teacher.findByIdAndDelete(
      req.params.id
    );


    res.json({

      message:
        'Teacher deleted successfully'

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to delete teacher'

    });

  }

};


module.exports = {

  createTeacher,

  getTeachers,

  getTeacherById,

  updateTeacher,

  deleteTeacher

};