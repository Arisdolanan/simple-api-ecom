const models = require("../../models");
const path = require('path');

const getAllProducts = async (req, res) => {
  await models.products.findAll({}).then((data) => {
    res.status(200).send({
      status: 200,
      data: data,
      message: `Successfully retrieved`,
    });
  });
};

const createProducts = async (req, res) => {
  const data = req.body;
  if (req.files) {
    const file = req.files.image;
    await file.mv(path.join(__dirname, '../../public/uploads/'+ file.name), (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
    data.thumbnail = req.protocol + "://" + req.get('host') + '/uploads/'+ file.name;
    await models.products
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
  }else{
    res.send({
      status: false,
      message: 'No file uploaded'
    });
  }
};

const updateProducts = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await models.products
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

const deleteProducts = async (req, res) => {
  await models.products
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
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
};