import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../api/client';
import { Book, Plus, Trash2 } from 'lucide-react';

const Library: React.FC = () => {
  const [books, setBooks] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  
  const fetchBooks = async () => {
    try {
        const res = await client.get('/library');
        setBooks(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await client.post('/library', data);
      reset();
      fetchBooks();
    } catch (error) {
      alert('Failed to add book');
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm('Delete this book?')) {
        await client.delete(`/library/${id}`);
        fetchBooks();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Library Management</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input {...register('title', { required: true })} placeholder="Title" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input {...register('author', { required: true })} placeholder="Author" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input {...register('isbn', { required: true })} placeholder="ISBN" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input {...register('category', { required: true })} placeholder="Category" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <div className="flex gap-2">
            <input type="number" {...register('quantity', { required: true })} placeholder="Qty" className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="number" {...register('available', { required: true })} placeholder="Avail" className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: any) => (
          <div key={book._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                    <Book size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                 </div>
              </div>
              <button onClick={() => handleDelete(book._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white">{book.category}</p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">ISBN</p>
                    <p className="font-medium text-gray-900 dark:text-white">{book.isbn}</p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-medium text-gray-900 dark:text-white">{book.quantity}</p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Available</p>
                    <p className="font-medium text-green-600">{book.available}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;