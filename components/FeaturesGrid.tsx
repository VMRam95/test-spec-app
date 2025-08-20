'use client';

import { ReactNode } from 'react';
import { 
  LightBulbIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  RocketLaunchIcon 
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
    title: 'Innovation',
    description: 'Cutting-edge solutions that keep you ahead of the competition',
    icon: <LightBulbIcon className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security to protect your valuable data',
    icon: <ShieldCheckIcon className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and efficiency across all platforms',
    icon: <SparklesIcon className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: 'Scalability',
    description: 'Grow your business with confidence using our scalable infrastructure',
    icon: <RocketLaunchIcon className="w-8 h-8" aria-hidden="true" />,
  },
];

export default function FeaturesGrid({
  title = 'Why Choose Us',
  subtitle = 'Discover the advantages that set us apart',
  features = defaultFeatures,
}: FeaturesGridProps) {
  return (
    <section 
      className="py-16 bg-white dark:bg-gray-900"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                {feature.icon}
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