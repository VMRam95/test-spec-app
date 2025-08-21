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
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in"
        >
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href={ctaLink}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:scale-105"
            role="button"
            aria-label={`${ctaText} - Primary Call to Action`}
          >
            {ctaText}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
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
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6 text-white opacity-50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;