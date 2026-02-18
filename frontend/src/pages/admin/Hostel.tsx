import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../api/client';
import { Home, Plus, Trash2, Users } from 'lucide-react';

const Hostel: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  
  const fetchRooms = async () => {
    try {
        const res = await client.get('/hostel');
        setRooms(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await client.post('/hostel', data);
      reset();
      fetchRooms();
    } catch (error) {
      alert('Failed to add room');
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm('Delete this room?')) {
        await client.delete(`/hostel/${id}`);
        fetchRooms();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hostel Management</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Room</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <input {...register('name', { required: true })} placeholder="Hostel Name" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input {...register('roomNumber', { required: true })} placeholder="Room No" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <select {...register('type', { required: true })} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
          <input type="number" {...register('capacity', { required: true })} placeholder="Capacity" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <input type="number" {...register('occupied', { required: true })} placeholder="Occupied" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room: any) => (
          <div key={room._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-lg ${room.type === 'Boys' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                    <Home size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{room.name} - {room.roomNumber}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{room.type} Hostel</p>
                 </div>
              </div>
              <button onClick={() => handleDelete(room._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="mt-4">
                <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                    <span>Occupancy</span>
                    <span>{room.occupied} / {room.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${room.occupied >= room.capacity ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min((room.occupied / room.capacity) * 100, 100)}%` }}
                    ></div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hostel;