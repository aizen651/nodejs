export default function ProductCard({ product, onEdit, onDelete }) {
  
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {product.image ? (
      <img
      src={`http://localhost:5000/uploads/${product.image}`}
      alt={product.name}
      className="w-full h-48 object-cover"
      />
      ) : (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        No image
      </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">${Number(product.price).toFixed(2)}</p>
        <div className="flex gap-2 mt-4">
          <button onClick={() => onEdit(product)}
          className="flex-1 bg-yellow-400 text-white py-1.5 rounded-lg hover:bg-yellow-500 transition text-sm font-medium">
            Edit
          </button>
          <button onClick={() => onDelete(product.id)}
          className="flex bg-red-500 text-white py-1.5 rounded-lg hover:bg-red-600 transition text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
    );
}