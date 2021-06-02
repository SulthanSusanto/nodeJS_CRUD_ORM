const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  const { first_name, last_name } = req.body
  if (!first_name)
    return res.status(400).send({
      message: 'Content can not be empty!',
    })

  const dataUser = {
    first_name,
    last_name,
  }

  User.create(dataUser)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating Tutorial.',
      })
    })
}

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating Tutorial.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating Tutorial.',
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  User.update(req.body, {
    where: { id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: 'User was updated successfully',
      })
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      })
    }
  })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: 'User was deleted successfully',
      })
    } else {
      res
        .send({
          message: `Cannot delete User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Could not delete User with id=' + id,
          })
        })
    }
  })
}

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all User',
      })
    })
}
