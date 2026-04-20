import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

// Adapter: converts Platzi product format → Fakestore format
const adaptProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category?.name || 'Uncategorized',
  image: Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : 'https://placehold.co/400x400?text=No+Image',
  rating: {
    rate: +(Math.sin(product.id) * 1 + 4).toFixed(1),  // Deterministic rating 3.0–5.0
    count: ((product.id * 37) % 450) + 50,
  },
});

export const fetchProducts = async () => {
  const response = await api.get('/products?offset=0&limit=20');
  return response.data.map(adaptProduct);
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data.map((cat) => cat.name);
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return adaptProduct(response.data);
};

export default api;