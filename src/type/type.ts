

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: {
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

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
