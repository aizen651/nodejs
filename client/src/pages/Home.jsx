import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { fetchProducts(); }, []);
  
  const handleCreate = async (formData) => {
    await createProduct(formData);
    fetchProducts();
    setShowForm(false);
  };
  
  const handleUpdate = async (formData) => {
    await updateProduct(editing.id, formData);
    fetchProducts();
    setEditing(null);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-5 px-8 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Manager</h1>
          <button
          onClick={() => { setShowForm(!showForm); setEditing(null); }}
          className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
            {showForm ? 'Close' : '+ Add Product'}
          </button>
        </div>
      </header>
      
      {/* main */}
      <main className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Create form */}
        {showForm && (
        <ProductForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        )}
        {/* Edit form */}
        {editing && (
        <ProductForm
        initialData={editing}
        onSubmit={handleUpdate}
        onCancel={() => setEditing(null)}
        />
        )}
        
        {/* Products grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products yet. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
            <ProductCard
            key={p.id}
            product={p}
            onEdit={(product) => { setEditing(product); setShowForm(false);}}
            onDelete={handleDelete}
            />
            ))}
          </div>
        )}
      </main>
    </div>
    );
}