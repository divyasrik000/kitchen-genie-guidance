
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'low' | 'medium' | 'high' | 'empty' | 'expired' | 'fresh';

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  low: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-800 dark:text-amber-200',
    border: 'border-amber-200 dark:border-amber-800/30'
  },
  medium: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800/30'
  },
  high: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800/30'
  },
  empty: {
    bg: 'bg-gray-100 dark:bg-gray-800/30',
    text: 'text-gray-800 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-700/30'
  },
  expired: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800/30'
  },
  fresh: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-800 dark:text-emerald-200',
    border: 'border-emerald-200 dark:border-emerald-800/30'
  }
};

const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'px-2.5 py-0.5 text-xs font-medium rounded-full border',
      config.bg,
      config.text,
      config.border,
      className
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusChip;
