import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

interface AnimatedUnderlineLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

// Animated underline link component
function AnimatedUnderlineLink({
  onClick,
  href,
  children,
}: AnimatedUnderlineLinkProps) {
  // state for the hover status
  const [isHovered, setIsHovered] = useState(false);

  // spring animation for the underline
  const underlineAnimation = useSpring({
    // animate the width of the underline
    to: { width: isHovered ? '100%' : '0%' },
    // config for the animation
    config: { duration: 300 },
  });

  return (
    <div className="relative inline-block">
      <Link
        to={href || '#!'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="cursor-pointer text-lg text-background no-underline transition-all duration-300 ease-in-out hover:text-white"
      >
        {children}
      </Link>
      <animated.span
        className="absolute bottom-0 left-0 h-0.5 bg-white"
        style={underlineAnimation}
      />
    </div>
  );
}

export default AnimatedUnderlineLink;
