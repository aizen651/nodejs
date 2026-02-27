import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description || '',
        price: initialData.price,
      });
      if (initialData.image) {
        setPreview(`http://localhost:5000/uploads/${initialData.image}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    if (image) formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {initialData ? 'Edit Product' : 'Add Product'}
      </h2>

      <input
        type="text" name="name" placeholder="Product Name"
        value={form.name} onChange={handleChange} required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="description" placeholder="Description"
        value={form.description} onChange={handleChange} rows={3}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number" name="price" placeholder="Price" step="0.01"
        value={form.price} onChange={handleChange} required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div>
        <label className="block text-sm text-gray-600 mb-1">Product Image</label>
        <input type="file" accept="image/*" onChange={handleImage}
          className="w-full text-sm text-gray-500" />
        {preview && (
          <img src={preview} alt="Preview"
            className="mt-2 h-40 w-full object-cover rounded-lg border" />
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}