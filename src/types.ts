export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  specs: {
    [key: string]: string;
  };
  sizes: string[];
  thicknesses?: string[];
  isZaaraAuthorized?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedThickness?: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  role: string;
  location: string;
  rating: number;
  avatarInitial: string;
  date: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}
