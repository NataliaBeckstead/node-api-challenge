const express = require('express');

const router = express.Router();

const Projects = require("./helpers/projectModel");
const Actions = require("./helpers/actionModel");

// api/project/:id/actions
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error, coudn't get posts"
      });
    });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error, coudn't get project"
      });
    });
});

router.get('/:id/actions/:id', (req, res) => {
    Actions.get(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error, coudn't get action"
      });
    });
});

router.post("/", (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the post." });
    } else {
        Projects.insert(req.body)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the project to the database",
          });
        })
    }
});

router.post("/:id/actions/", (req, res) => {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json({ errorMessage: "Please provide notes, project_id and description for the post." });
    } else {
        Actions.insert(req.body)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the project to the database",
          });
        })
    }
});

router.put("/:id", (req, res) => {
    !req.params.id
      ? res.status(404).json({ message: "The project with the specified ID does not exist." })
      : req.body.name && req.body.description
      ? Projects.update(req.params.id, req.body)
          .then(res.status(200).json(req.body))
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "The project information could not be modified." });
          })
      : res
          .status(400).json({ errorMessage: "Please provide name and description for the post.", });
});

router.put("/:id/actions/:id", (req, res) => {
    !req.params.id
      ? res.status(404).json({ message: "The action with the specified ID does not exist." })
      : req.body.notes && req.body.description && req.body.project_id
      ? Actions.update(req.params.id, req.body)
          .then(res.status(200).json(req.body))
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "The action information could not be modified." });
          })
      : res
          .status(400).json({ errorMessage: "Please provide notes, project_id and description for the post.", });
});

router.delete('/:id',  (req, res) => {
    Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({message: "project has been deleted"})
      } else{
        res.status(400).json({message: 'cannot find project'})
      }
    })
    .catch((error) => {
      res.status(500).json({message: "server error"});
    });
});

router.delete('/:id/actions/:id',  (req, res) => {
    Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({message: "action has been deleted"})
      } else{
        res.status(400).json({message: 'cannot find action'})
      }
    })
    .catch((error) => {
      res.status(500).json({message: "server error"});
    });
});

module.exports = router;

// function validateProjectId(req, res, next) {
//     const { id } = req.params;
//     Posts.get(id)
//     .then((project) => {
//       if (project) {
//         req.project = project;
//         next();
//     } else {
//       res.staus(404).json({message: "Can't find"})
//     }
//     })
//     .catch((err) => {
//       res.status(500).json({message: "No such id"})
//     });
// }