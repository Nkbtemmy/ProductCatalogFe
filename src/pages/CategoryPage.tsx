import React, { useEffect, useState } from 'react';
import API from '../api/client';

interface Product {
    id: string;
    name: string;
    price: number;
}

interface Category {
    length: any;
    id: string;
    name: string;
    products: Product[];
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal and form state
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const res = await API.get(`/categories/`);
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching category:', err);
                setCategories(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    },[]);

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setCreateError('');
        try {
            await API.post('/categories', { name: newCategoryName });
            setShowModal(false);
            setNewCategoryName('');
            // Optionally, refetch categories or redirect
        } catch (err) {
            setCreateError('Error creating category.');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading category...</div>;
    }

    if (!categories || !categories.length) {
        return <div className="p-6 text-center text-red-500">Category not found.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => setShowModal(true)}
                >
                    Create Category
                </button>
            </div>

            {Array.isArray(categories) && categories.length === 0 && (
                <p className="text-gray-600">No categories found.</p>
            )}

            <div className="space-y-10">
                {Array.isArray(categories) &&
                    categories.map((category) => (
                        <div key={category.id}>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-3">{category.name}</h2>
                            {category.products.length === 0 ? (
                                <p className="text-gray-500 mb-6">No products found in this category.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                                    {category.products.map((product:any) => (
                                        <div key={product.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
                                            <h3 className="text-xl font-semibold text-gray-700">{product.name}</h3>
                                            <p className="text-gray-500 mt-2">${product.price.toFixed(2)}</p>
                                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                                View Product
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create New Category</h2>
                        <form onSubmit={handleCreateCategory}>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2 mb-4"
                                placeholder="Category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                            {createError && <div className="text-red-500 mb-2">{createError}</div>}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowModal(false)}
                                    disabled={creating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    disabled={creating}
                                >
                                    {creating ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
