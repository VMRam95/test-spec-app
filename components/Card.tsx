import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'featured';
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = '',
  variant = 'default',
  animate = true,
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl p-6 
    transition-all duration-300 ease-in-out
    ${animate ? 'hover:scale-105 hover:shadow-2xl' : ''}
    ${variant === 'featured' 
      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl' 
      : 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700'
    }
  `;

  const iconWrapperClasses = `
    flex items-center justify-center w-12 h-12 mb-4 rounded-lg
    ${variant === 'featured' 
      ? 'bg-white/20 backdrop-blur-sm' 
      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    }
  `;

  const titleClasses = `
    text-xl font-semibold mb-2
    ${variant === 'featured' 
      ? 'text-white' 
      : 'text-gray-900 dark:text-white'
    }
  `;

  const descriptionClasses = `
    text-sm leading-relaxed
    ${variant === 'featured' 
      ? 'text-white/90' 
      : 'text-gray-600 dark:text-gray-300'
    }
  `;

  const CardContent = () => (
    <>
      <div className={iconWrapperClasses} aria-hidden="true">
        {icon}
      </div>
      <h3 className={titleClasses}>{title}</h3>
      <p className={descriptionClasses}>{description}</p>
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className} group block`}
        aria-label={`${title}: ${description}`}
      >
        <CardContent />
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${className} group text-left w-full`}
        aria-label={`${title}: ${description}`}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${className} group`}
      role="article"
      aria-label={`${title}: ${description}`}
    >
      <CardContent />
    </div>
  );
};

export default Card;