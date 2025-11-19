const Cart = require("../models/Cart");
const ConfirmOrder = require("../models/ConfirmOrders");

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


exports.confrimOrder =async (req,res)=> {
  const {data} = req.body
  console.log(data);
  const cart = await Cart.find({email:data.email})
  

 try {
  const result = new ConfirmOrder({email:data.email,address:data,orders:cart})
   await result.save()
   res.send(result)
  
 } catch (error) {
 res.send(error)
  
 }

  
}

exports.getConfirmOrderController = async(req,res,next) => {
  const data =await ConfirmOrder.find()
  res.send(data)
}
