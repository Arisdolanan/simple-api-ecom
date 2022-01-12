const models = require("../../models");

const getAllOrders = async (req, res) => {
  await models.orders.findAll({}).then((data) => {
    res.status(200).send({
      status: 200,
      data: data,
      message: `Successfully retrieved`,
    });
  });
};

const createOrders = async (req, res) => {
  const data = req.body;
  await models.categories
    .create(data)
    .then((result) => {
      res.send({
        status: true,
        message: "created",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "error, " + err.message,
      });
    });
};

const updateOrders = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await models.categories
    .update(data, {
      where: {
        id: id,
      },
    })
    .then((rowUpdate) => {
      if (rowUpdate > 0) {
        res.send({
          status: true,
          message: "update success",
        });
      } else {
        res.send({
          status: false,
          message: "update failed",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: false,
        message: `Err ${err.message}`,
      });
    });
};

const deleteOrders = async (req, res) => {
  await models.categories
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.send({ status: result });
    });
};

module.exports = {
  getAllOrders,
  createOrders,
  updateOrders,
  deleteOrders,
};
