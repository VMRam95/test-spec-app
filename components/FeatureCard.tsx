import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg ${className}`}
      role="article"
    >
      {/* Icon wrapper with consistent sizing and styling */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title with proper heading hierarchy */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description with appropriate contrast and readability */}
      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}