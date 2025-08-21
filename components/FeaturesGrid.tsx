'use client';

import { ReactNode } from 'react';
import { 
  ChartBarIcon, 
  CursorArrowRaysIcon, 
  ShieldCheckIcon, 
  CircleStackIcon, 
  CloudArrowUpIcon, 
  CpuChipIcon 
} from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: 'High Performance',
    description: 'Optimized for speed and efficiency with modern web technologies.',
    icon: <ChartBarIcon className="w-8 h-8" />,
  },
  {
    title: 'User Experience',
    description: 'Intuitive interface designed for maximum user engagement.',
    icon: <CursorArrowRaysIcon className="w-8 h-8" />,
  },
  {
    title: 'Security First',
    description: 'Built-in security features to protect your data and privacy.',
    icon: <ShieldCheckIcon className="w-8 h-8" />,
  },
  {
    title: 'Data Management',
    description: 'Robust data handling with efficient storage solutions.',
    icon: <CircleStackIcon className="w-8 h-8" />,
  },
  {
    title: 'Cloud Integration',
    description: 'Seamless integration with popular cloud services.',
    icon: <CloudArrowUpIcon className="w-8 h-8" />,
  },
  {
    title: 'Smart Processing',
    description: 'Advanced algorithms for intelligent data processing.',
    icon: <CpuChipIcon className="w-8 h-8" />,
  },
];

export default function FeaturesGrid({
  title = 'Why Choose Us',
  subtitle = 'Discover the features that make our solution stand out',
  features = defaultFeatures,
}: FeaturesGridProps) {
  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                <div className="text-blue-600 dark:text-blue-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}