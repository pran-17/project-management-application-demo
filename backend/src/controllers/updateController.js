const ProjectUpdate =
  require('../models/projectupdate');

const Project =
  require('../models/project');


const createUpdate = async (
  req,
  res
) => {

  try {

    const update =
      await ProjectUpdate.create(
        req.body
      );


    // UPDATE PROJECT PROGRESS

    if (req.body.progress !== undefined) {

      await Project.findByIdAndUpdate(

        req.body.project,

        {
          progress:
            req.body.progress
        }

      );

    }


    res.status(201).json({

      message:
        'Project update submitted successfully',

      update

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        'Failed to submit update'

    });

  }

};


const getUpdates = async (
  req,
  res
) => {

  try {

    const updates =
      await ProjectUpdate.find()

        .populate(
          'project',
          'title progress'
        )

        .populate(
          'student',
          'name registerNumber'
        )

        .populate(
          'reviewedBy',
          'name employeeId'
        )

        .sort({
          createdAt: -1
        });


    res.json(updates);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get updates'

    });

  }

};


const getProjectUpdates = async (
  req,
  res
) => {

  try {

    const updates =
      await ProjectUpdate.find({

        project:
          req.params.projectId

      })

        .populate(
          'student',
          'name registerNumber'
        )

        .populate(
          'reviewedBy',
          'name'
        )

        .sort({
          createdAt: -1
        });


    res.json(updates);


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to get project updates'

    });

  }

};


const reviewUpdate = async (
  req,
  res
) => {

  try {

    const {

      teacherComment,

      reviewStatus,

      reviewedBy

    } = req.body;


    const update =
      await ProjectUpdate.findByIdAndUpdate(

        req.params.id,

        {

          teacherComment,

          reviewStatus,

          reviewedBy

        },

        {
          new: true
        }

      );


    res.json({

      message:
        'Update reviewed successfully',

      update

    });


  } catch (error) {

    res.status(500).json({

      message:
        'Failed to review update'

    });

  }

};


module.exports = {

  createUpdate,

  getUpdates,

  getProjectUpdates,

  reviewUpdate

};