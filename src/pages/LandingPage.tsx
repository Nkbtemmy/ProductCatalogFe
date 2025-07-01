import { useEffect, useState } from 'react';
import API from '../api/client';

type Category = {
    id: string;
    name: string;
};

const LandingPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Replace API with your actual API utility
                const res = await API.get(`/categories/`);
                setCategories(res.data);
            } catch {
                // handle error if needed
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">ProductCatalog</h1>
                    <div className="space-x-4">
                        <a href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600">Login</a>
                        <a href="/register" className="text-sm font-semibold text-gray-700 hover:text-blue-600">Register</a>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 mt-8">
                <section className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Discover Our Product Categories</h2>
                    <p className="text-lg text-gray-600">Browse quality products from verified suppliers</p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500">Loading categories...</div>
                    ) : categories.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No categories found.</div>
                    ) : (
                        categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                                <p className="text-sm text-gray-500">Explore high quality {category.name.toLowerCase()} items today.</p>
                                <a href={`/categories/${category.name.toLowerCase()}`} className="text-blue-500 text-sm mt-4 inline-block hover:underline">
                                    View Products →
                                </a>
                            </div>
                        ))
                    )}
                </section>
            </main>

            <footer className="mt-12 py-6 border-t text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} ProductCatalog. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
