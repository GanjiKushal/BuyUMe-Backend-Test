let express = require("express")
let mongoose = require("mongoose")
let app = express()
let port = 8080
let Product = require("./schema")

//Connectiong to data base
mongoose.connect("mongodb://localhost/buyume", () => {
    console.log("Connected to database");
}, e => console.error(e))
//Data base is connected to My local system

app.use(express.json())

app.get("/", async (req, res) => {
    try {
        let data = await Product.find()
        res.status(200).json({
            message: "Your Data is here",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

app.post("/", async (req, res) => {
    let { productID, Quantity, operation } = req.body
    try {
        const prod = await Product.findOne({ productID })
        if (prod) {
            if (operation == "add") {
                await Product.updateOne({ productID }, { Quantity: prod.Quantity + Quantity })
                res.json({
                    message:"Data updated Successfully",
                    prod
                })
            }
            else if (operation == "subtract") {
                await Product.updateOne({ productID }, { Quantity: prod.Quantity - Quantity })
                res.json({
                    message:"Data updated Successfully",
                    prod
                })
            }
        }
        else {
            let data = await Product.create(req.body)
            res.json({
                message: "Data Uploaded Successfully",
                data

            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
app.listen(port, () => {
    console.log("Server is listening at " + port);
})