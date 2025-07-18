import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-200 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-blue-200 text-blue-800 border-blue-300',
  DONE: 'bg-green-200 text-green-800 border-green-300',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={clsx(
        'text-xs font-medium px-2.5 py-0.5 rounded border',
        statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;