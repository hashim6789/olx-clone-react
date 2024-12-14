import { Router } from "express";
import ProductController from "../controllers/ProductController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const productRouter = Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.post(
  "/",
  upload.single("productImage"),
  ProductController.createProduct
);
productRouter.get("/:productId", ProductController.getProductsById);
productRouter.get(
  "/my-products/:userId",
  ProductController.getProductsByUserId
);
productRouter.put("/:productId", ProductController.editProductById);
productRouter.delete("/:productId", ProductController.deleteProductById);
productRouter.patch(
  "/:productId/wishlist",
  ProductController.toggleWishlistById
);

export default productRouter;
