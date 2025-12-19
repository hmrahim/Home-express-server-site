const Cart = require("../models/Cart");
const ConfirmOrder = require("../models/ConfirmOrders");
const User = require("../models/User");

exports.CartPostController = async (req, res, next) => {
  const email = req.body.email;
  const id = req.body.id;
  // const id = await Cart.findOne({ id: data.id });
  // const email = await Cart.findOne({ email: data.email });
  const findByEmail = await Cart.find({ email: email });
  const cart = findByEmail.find((cart) => cart.id === id);
  if (cart) {
    return res.send({
      error: 400,
      message: "Product is already added, You can update quantity.",
    });
  }

  try {
    const result = new Cart(req.body);

    await result.save();
    res.send({
      success: 200,
      message: "Product added to cart, please choice new products",
    });
  } catch (error) {}
};

exports.CartGetController = async (req, res, next) => {
  const email = req.params.email;

  const data = await Cart.find({ email: email });
  res.send(data);
};

exports.CartDeleteController = async (req, res, next) => {
  const id = req.params.id;
  const result = await Cart.findOneAndDelete({ _id: id });

  res.send(result);
};

exports.CartUpdateController = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  // const quantity = Number(req.body.quantity) +1
  try {
    const query = { _id: id };
    const docs = {
      $set: { quantity: data.quantity },
    };
    const result = await Cart.findOneAndUpdate(query, docs, { new: true });

    res.send(result);
  } catch (error) {}
};

exports.postCustomarInfo = async (req, res) => {
  const { info } = req.body;

  const cart = await Cart.find({ email: info.email });
  

  try {
    const result = new ConfirmOrder({
      email: info.email,
      address: info,
      orders: cart,
    });
    await result.save();
   
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// exports.getConfirmOrderController = async(req,res,next) => {
//   const data =await ConfirmOrder.find()
//   res.send(data)
// }
exports.getConfirmOrderController = async (req, res, next) => {
  const data = await ConfirmOrder.find().sort({ _id: -1 })

  res.send(data);


//   const result = await ConfirmOrder.aggregate([
//   {
//     $group: {
//       _id: {
//         $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//       },
//       items: { $push: "$$ROOT" }, // all documents of that date
//       count: { $sum: 1 }          // optional
//     }
//   },
//   { $sort: { _id: 1 } }            // sort by date
// ]);

// res.send(result);








};

exports.getConfirmOrderByIdController = async (req, res, next) => {
  const id = req.params.id;
  const order = await ConfirmOrder.findOne({ _id: id });
  // console.log(order.email,order._id);
  res.send(order);
};

exports.confirmOrderController = async (req, res, next) => {
  const email = req.params.email;
  const data = req.body.items;

  console.log(email, data);
  try {
    const query = { email: email, status: "unconfirmed" };
    const docs = {
      $set: {
        status: data.status,
        payType: data.payment,
        orderNo: data.orderNo,
      },
    };
    const result = await ConfirmOrder.findOneAndUpdate(query, docs, {
      new: true,
    });
    const delte = await Cart.deleteMany({ email: email });
    // console.log(delte);
    // console.log(result);
    res.send(result);
  } catch (error) {}
};

exports.cancelledOrderController = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const query = { _id: id };
    const docs = {
      $set: {
        status: data.status,
      },
    };
    const result = await ConfirmOrder.findOneAndUpdate(query, docs, {
      new: true,
    });

    res.send(result);
  } catch (error) {}
};

exports.updateConfirmOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const query = { _id: id };
    const docs = {
      $set: {
        status: data.status,
        totalAmount: data.totalAmount,
      },
    };
    const result = await ConfirmOrder.findOneAndUpdate(query, docs, {
      new: true,
    });

    if(result){
      const updateRider = await User.findOneAndUpdate({email:data.rider},{$push:{orders:result._id}},{new:true})
    }

    
    res.send(result);
  } catch (error) {}
};

exports.DeleteAllCartController = (req, res, next) => {
  const { id } = req.params.id;
};

exports.getConfirmOrderByEmailController = async (req, res, next) => {
  const email = req.params.email;
  const order = await ConfirmOrder.find({ email: email, status:{$in:["pending","confirmed","delivered"]} });
  res.send(order);
};
exports.geAlltConfirmOrderByEmailController = async (req, res, next) => {
  const email = req.params.email;
  const order = await ConfirmOrder.find({ email: email });
  res.send(order);
};
