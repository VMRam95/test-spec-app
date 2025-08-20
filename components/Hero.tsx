import { FC } from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const Hero: FC<HeroProps> = ({
  title = "Transform Your Digital Presence",
  subtitle = "Create stunning websites that captivate your audience and drive results",
  ctaText = "Get Started",
  ctaLink = "#contact",
  backgroundImage = "/hero-bg.jpg"
}) => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href={ctaLink}
            className="inline-flex items-center px-8 py-3 border border-transparent 
                     text-base font-medium rounded-md text-white bg-indigo-600 
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-indigo-500 transition-colors
                     duration-200 transform hover:scale-105"
            role="button"
            aria-label={`${ctaText} - ${title}`}
          >
            {ctaText}
            <svg 
              className="ml-2 -mr-1 w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t 
                     from-gray-900 to-transparent dark:from-black"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default Hero;