'use client';

import { ReactNode } from 'react';
import { 
  ChartBarIcon, 
  CursorArrowRaysIcon, 
  ShieldCheckIcon, 
  CircleStackIcon 
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
    title: 'Analytics',
    description: 'Get detailed insights into your business performance with our advanced analytics tools.',
    icon: <ChartBarIcon className="w-8 h-8" />,
  },
  {
    title: 'User-Friendly',
    description: 'Intuitive interface designed for the best possible user experience.',
    icon: <CursorArrowRaysIcon className="w-8 h-8" />,
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security to keep your data safe and protected.',
    icon: <ShieldCheckIcon className="w-8 h-8" />,
  },
  {
    title: 'Scalability',
    description: 'Built to grow with your business, from startup to enterprise.',
    icon: <CircleStackIcon className="w-8 h-8" />,
  },
];

export default function FeaturesGrid({
  title = 'Features',
  subtitle = 'Everything you need to succeed',
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <div className="text-blue-600 dark:text-blue-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
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