const models = require("../../models");
const model_mst_users = require("../../models").mst_users;
const model_orders = require("../../models").orders;
const model_products = require("../../models").products;

const getAllOrdersDetail = async (req, res) => {
  await models.orders_detail.findAll({
    include: [
      {
        model: model_orders,
        as: "v_orders",
      },
      {
        model: model_products,
        as: "v_products",
        include:[
          {
            model: model_mst_users,
            as: "v_mst_users",    
          }
        ]
      }
    ],
  }).then((data) => {
    res.status(200).send({
      status: 200,
      data: data,
      message: `Successfully retrieved`,
    });
  });
};

const createOrdersDetail = async (req, res) => {
  const data = req.body;
  await models.orders_detail
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

const getAllOrders = async (req, res) => {
  await models.orders.findAll({
    include: [
      {
        model: model_mst_users,
        as: "v_mst_users",
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  }).then((data) => {
    res.status(200).send({
      status: 200,
      data: data,
      message: `Successfully retrieved`,
    });
  });
};

const createOrders = async (req, res) => {
  const data = req.body;
  await models.orders
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
  await models.orders
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
  await models.orders
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
  getAllOrdersDetail,
  createOrdersDetail
};
