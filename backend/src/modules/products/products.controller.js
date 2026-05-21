import productModel from "./models/products.model.js";

const productController ={}
productController.getProducts = async (req,res) => {
    try {   
        const products = await productModel.find();
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
export default productController