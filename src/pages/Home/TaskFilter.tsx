import React, { useState } from 'react';


interface TaskFiltersProps {
  onChange: (filters: {
    dueDate?: Date | null;
    createdAt?: Date | null;
    status?: string;
  }) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onChange }) => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleSubmit = () => {
    onChange({ dueDate, createdAt, status });
  };

  const handleReset = () => {
    setDueDate(null);
    setCreatedAt(null);
    setStatus('');
    onChange({ dueDate: null, createdAt: null, status: '' });
  };

  return (
    <div className='flex gap-x-4 items-end justify-end'>
        
        

        {/* Status Dropdown */}
        <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring"
            >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            </select>
        </div>

        {/* Action Buttons */}
        <div className="flex  space-x-2">
            <button
            onClick={handleSubmit}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
            Filter
            </button>
            <button
            onClick={handleReset}
            className="px-3 text-sm py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
            Reset
            </button>
        </div>
        
    </div>
  );
};

export default TaskFilters;
