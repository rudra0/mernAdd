var path = require("path")
var express =require("express");
var config =require('../backend/config');
var dotenv = require('dotenv');
var mongoose = require('mongoose') ;
var router = require("./routes/userRoute");
var productRoute = require("./routes/productRoute")
var orderRoute = require("./routes/orderRoute")
const Razorpay = require('razorpay');
var bodyParser =require('body-parser');
var cors = require('cors')
const { inflateRaw } = require("zlib");



const razorpay = new Razorpay({
    key_id : 'rzp_test_VHWqslZ0KtAnIS',
    key_secret : 'i7kX3Jl7177wTbDTS6GJtrvg',

});

dotenv.config();

const mongodburl= config.MONGODB_URL;
const URI = process.env.MONGODB_URL || 'mongodb+srv://admin:passwordpassword@cluster0-bco9o.mongodb.net/Koob?retryWrites=true&w=majority'
const connectDb = async()=>{
    await  mongoose.connect(URI,{
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    console.log("db connected")
    )
}
connectDb();

const PORT = process.env.PORT || 3002



// const localDb= async()=>{
//     await mongoose.connect(mongodburl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true

// },
// console.log("dbConneced")
// ).catch(error=> console.log(error.reason));

// }

// localDb();



const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use("/api/users", router);

app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);
// RazorPay object creation 
app.post('/razorpay', async (req, res) => {
	
	const payment_capture = 1
	const amount = req.body.amount
    const currency = req.body.currency
    

	const options = {
		amount: amount * 100,
		currency,
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature

		})
		
		
	} catch (error) {
		console.log(error)
	}
})



// app.get("/api/product/:id",(req, res)=>{
//     const productId = req.params.id;
    
//     const product = data.products.find(x =>x.dressId === productId);
//     console.log(productId)
//     if(product)
//         res.send(product);
//     else
//         res.status(400).send( { msg: "Product Not Found" });
// })

// app.get("/api/products",(req, res)=>{
//     res.send(data.products);
// })


if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
    app.get('/*', (req, res) => {
        const resolve = path.resolve(__dirname, '../client', 'build', 'index.html')
        
        res.sendFile(resolve);
      
    });
}



// app.use(express.static(path.resolve(__dirname, '../client', 'build')));


app.listen(PORT,()=>{
    console.log("connected");
})