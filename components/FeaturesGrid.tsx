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
    icon: <LightBulbIcon className="w-8 h-8" />,
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security to protect your valuable data',
    icon: <ShieldCheckIcon className="w-8 h-8" />,
  },
  {
    title: 'Quality',
    description: 'Premium features and functionality that exceed expectations',
    icon: <SparklesIcon className="w-8 h-8" />,
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and efficiency across all platforms',
    icon: <RocketLaunchIcon className="w-8 h-8" />,
  },
];

export default function FeaturesGrid({
  title = 'Why Choose Us',
  subtitle = 'Discover the advantages that set us apart',
  features = defaultFeatures,
}: FeaturesGridProps) {
  return (
    <section 
      className="py-12 px-4 md:py-20 bg-white dark:bg-gray-900"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
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