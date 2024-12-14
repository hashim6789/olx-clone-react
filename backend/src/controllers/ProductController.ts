import ProductServices from "../services/ProductServices";
import { Request, Response } from "express";
import { uploadImageToCloudinary } from "../utils/cloudinary";

class ProductController {
  constructor() {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductServices.fetchAllProductsFromDB();
      if (products.length === 0) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The Product collection is empty!",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The products are fetched successfully...",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while fetching all products!",
      });
    }
  }
  async getProductsById(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.productId;
      const product = await ProductServices.fetchProductByIdFromDB(productId);
      if (!product) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The product is doesn't exist in the database!",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The product is fetched successfully...",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while fetching product!",
      });
    }
  }
  async getProductsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const products = await ProductServices.fetchProductByUserIdFromDB(userId);
      console.log(products);
      if (!products) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The product is doesn't exist in the database!",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The product is fetched successfully...",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while fetching product!",
      });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: Product = req.body;
      let imageUrl = "";
      if (req.file) {
        const uploadResult = await uploadImageToCloudinary(req.file.buffer);
        imageUrl = uploadResult.secure_url;
      }
      console.log("image =", imageUrl);
      const product = await ProductServices.insertProductToDB({
        imageUrl,
        ...productData,
      });
      if (!product) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The product is doesn't exist in the database!",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: "The product is created successfully...",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while created product!",
      });
    }
  }
  async editProductById(req: Request, res: Response): Promise<void> {
    try {
      const productData: Product = req.body;
      const productId: string = req.params.productId;
      const product = await ProductServices.updateProductByIdFromDB(
        productId,
        productData
      );

      if (!product) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The product is doesn't exist in the database!",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The product is updated successfully...",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while updating product!",
      });
    }
  }
  async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.productId;
      const product = await ProductServices.deleteProductByIdFromDB(productId);
      if (!product) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "The product is doesn't exist in the database!",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The product is deleted successfully...",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "An Error while deleting product!",
      });
    }
  }
  async toggleWishlistById(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}

export default new ProductController();
