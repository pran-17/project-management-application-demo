const Project = require('../models/project');


const createProject = async (
  req,
  res
) => {

  try {

    const project =
      await Project.create(
        req.body
      );


    res.status(201).json({

      message:
        'Project created successfully',

      project

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to create project'

    });

  }

};


const getProjects = async (
  req,
  res
) => {

  try {

    const projects =
      await Project.find()
        .populate(
          'students',
          'name registerNumber'
        )
        .populate(
          'guide',
          'name employeeId'
        );


    res.json(projects);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get projects'

    });

  }

};


const getProjectById = async (
  req,
  res
) => {

  try {

    const project =
      await Project.findById(
        req.params.id
      )
        .populate('students')
        .populate('guide');


    if (!project) {

      return res.status(404).json({

        message:
          'Project not found'

      });

    }


    res.json(project);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get project'

    });

  }

};


const updateProject = async (
  req,
  res
) => {

  try {

    const project =
      await Project.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      );


    res.json({

      message:
        'Project updated successfully',

      project

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to update project'

    });

  }

};


const deleteProject = async (
  req,
  res
) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );


    res.json({

      message:
        'Project deleted successfully'

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to delete project'

    });

  }

};


module.exports = {

  createProject,

  getProjects,

  getProjectById,

  updateProject,

  deleteProject

};