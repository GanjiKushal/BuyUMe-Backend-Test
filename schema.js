let mongoose=require("mongoose")

let productSchema=new mongoose.Schema({
    productID:Number,
    Quantity:Number,
    operation:String
})

let Product=mongoose.model("Product",productSchema)
module.exports=Product