import ProductModel from "../models/Proudct";

class ProductServices {
  constructor() {}

  async fetchAllProductsFromDB(): Promise<Product[]> {
    try {
      const products = await ProductModel.find({});
      if (!products) {
        throw new Error("No products found in the database.");
      }
      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }
  async fetchProductByIdFromDB(productId: string): Promise<Product> {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error(
          "No product found in the database with the corresponding id"
        );
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error}`);
    }
  }
  async fetchProductByUserIdFromDB(userId: string): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ userId });
      if (products.length === 0) {
        throw new Error(
          "No product found in the database with the corresponding id"
        );
      }
      return products;
    } catch (error) {
      throw new Error(`Error fetching product: ${error}`);
    }
  }

  async insertProductToDB(product: Product): Promise<Product> {
    try {
      const newProduct = new ProductModel({
        title: product.title,
        price: product.price,
        userId: product.userId,
        // isFeatured: product.isFeatured,
        imageUrl: product.imageUrl,
        location: product.location,
        // postingDate: product.postingDate,
        // description: product.description,
        sellerName: product.sellerName,
        contactNo: product.contactNo,
      });

      console.log(newProduct);
      const savedProduct = await newProduct.save();
      if (!savedProduct) {
        throw new Error("An error on inserting a product");
      }
      return savedProduct;
    } catch (error) {
      console.log(error);
      throw new Error("An unknown error occurred while inserting the product.");
    }
  }
  async updateProductByIdFromDB(
    productId: string,
    productData: Partial<Product>
  ): Promise<Product> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      if (!updatedProduct) {
        throw new Error("An error while updating the product!");
      }
      return updatedProduct;
    } catch (error) {
      throw new Error("An unknown error occurred while updating the product.");
    }
  }
  async deleteProductByIdFromDB(productId: string): Promise<Product> {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error(
          "There is some thing wrong while deleting the product!"
        );
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("An error while deleting the product!");
    }
  }
  async changeWishlistStatusOfProductByIdFromDB(productId: string) {}
}

export default new ProductServices();
