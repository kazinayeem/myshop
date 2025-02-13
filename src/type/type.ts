export type Product = {
  id: string;
  name: string;
  description?: string; 
  price: number; 
  stock: number; 
  categoryId: string;
  createdAt: Date; 
  updatedAt: Date;
  images: Image[]; 
  category : Category;
  
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Image = {
  id: string;
  url: string;
  productId: string;
  createdAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
};
