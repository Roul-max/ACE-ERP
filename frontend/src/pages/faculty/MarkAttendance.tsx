import React, { useState, useEffect } from 'react';
import client from '../../api/client';

const MarkAttendance: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    client.get('/courses/my').then(res => setCourses(res.data));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      // For prototype, fetching all students. Ideally filter by course enrollment
      client.get('/students').then(res => {
         // Initialize attendance status to 'Present' for all
         const initialAttendance: Record<string, string> = {};
         res.data.students.forEach((s: any) => initialAttendance[s._id] = 'Present');
         setStudents(res.data.students);
         setAttendance(initialAttendance);
      });
    }
  }, [selectedCourse]);

  const handleSubmit = async () => {
    if (!selectedCourse) return;
    
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      student: studentId,
      status
    }));

    try {
      await client.post('/attendance', {
        courseId: selectedCourse,
        date,
        records
      });
      alert('Attendance Marked Successfully');
    } catch (error) {
      alert('Error marking attendance');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mark Attendance</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select 
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((c: any) => (
              <option key={c._id} value={c._id}>{c.name} ({c.code})</option>
            ))}
          </select>
          <input 
            type="date" 
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {selectedCourse && (
          <>
            <div className="mt-6 border-t pt-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">Student List</h3>
              {students.map(student => (
                <div key={student._id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border-b dark:border-gray-700">
                  <span className="font-medium dark:text-white">{student.user?.name} <span className="text-gray-400 text-sm">({student.rollNumber})</span></span>
                  <div className="flex gap-2">
                    {['Present', 'Absent', 'Late'].map(status => (
                      <button
                        key={status}
                        onClick={() => setAttendance(prev => ({ ...prev, [student._id]: status }))}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          attendance[student._id] === status 
                            ? status === 'Present' ? 'bg-green-100 text-green-700' : status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Save Attendance
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;