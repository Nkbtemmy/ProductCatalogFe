import { useEffect, useState } from 'react';
import API, { setAuth } from '../api/client';
import Swal from 'sweetalert2';

const Products = () => {
  type Product = {
    id: string | number;
    name: string;
    price: number;
    categoryId?: string | number;
    [key: string]: any;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]); // 1. Add categories state
  const [apiKey] = useState(localStorage.getItem('apiKey') || '');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', categoryId: '' }); // 2. Add categoryId
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // 3. Fetch categories
    if (apiKey) {
      setAuth(apiKey);
    }
    // eslint-disable-next-line
  }, [apiKey]);

  const fetchProducts = async () => {
    try {
      setAuth(apiKey);
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error fetching products',
        text: err.response?.data?.error || 'Failed to fetch products',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // 4. Fetch categories from API
  const fetchCategories = async () => {
    try {
      setAuth(apiKey);
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error fetching categories',
        text: err.response?.data?.error || 'Failed to fetch categories',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.categoryId) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please provide name, price, and category.',
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setAdding(true);
    try {
      setAuth(apiKey);
      const res = await API.post('/products', {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        categoryId: newProduct.categoryId, // 5. Send categoryId
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', price: '', categoryId: '' });
      Swal.fire({
        icon: 'success',
        title: 'Product added',
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error adding product',
        text: err.response?.data?.error || 'Failed to add product',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <form
          className="flex gap-2 mb-6"
          onSubmit={handleAddProduct}
        >
          <input
            className="flex-1 border px-3 py-2 rounded-md"
            placeholder="Product name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            disabled={adding}
          />
          <input
            className="w-32 border px-3 py-2 rounded-md"
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            disabled={adding}
          />
          {/* 6. Category select */}
          <select
            className="w-48 border px-3 py-2 rounded-md"
            value={newProduct.categoryId}
            onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            disabled={adding}
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </form>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.map((p: any) => (
              <li key={p.id} className="py-3 flex justify-between items-center">
                <span className="font-medium text-gray-800">{p.name}</span>
                <span className="text-sm text-gray-600">${p.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
