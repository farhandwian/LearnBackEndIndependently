const modelStore = require("../model/model_store.js");

exports.getStores = async function (req, res) {
  try {
    const stores = await modelStore.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
    //res.render()
  } catch (err) {
    console.log(err);
  }
};

exports.addStores = async function (req, res, next) {
  try {
    console.log("tes1");
    console.log(req.body);
    const res = await modelStore.create(req.body);
    console.log("tes5");
    return res.status(201).json({
      success: true,
      data: res,
    });
  } catch (err) {
    console.log(err);
  }
};
