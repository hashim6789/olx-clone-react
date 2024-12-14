// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   year?: number;
//   mileage?: number;
//   location: string;
//   date: string;
//   imageUrl: string;
//   isFeatured?: boolean;
//   specs?: string;
//   propertySpecs?: string;
// }

declare interface Product {
  title: string;
  _id?: string;
  price: number;
  imageUrl?: string;
  location: string;
  sellerName: string;
  contactNo: string;
  productImage?: File | null;
}
