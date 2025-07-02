export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100%" },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromTop = {
  initial: { opacity: 0, y: "-100%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100%" },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100%" },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const flipIn = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { 
    opacity: 1, 
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const quantumHover = {
  whileHover: { 
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const neuralPulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const glowAnimation = {
  animate: {
    boxShadow: [
      "0 0 5px hsl(var(--quantum-500)), 0 0 10px hsl(var(--quantum-500)), 0 0 15px hsl(var(--quantum-500))",
      "0 0 10px hsl(var(--quantum-500)), 0 0 20px hsl(var(--quantum-500)), 0 0 30px hsl(var(--quantum-500))",
      "0 0 5px hsl(var(--quantum-500)), 0 0 10px hsl(var(--quantum-500)), 0 0 15px hsl(var(--quantum-500))"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const particleAnimation = {
  animate: {
    y: ["100vh", "-100vh"],
    x: ["-50px", "50px"],
    opacity: [0, 0.6, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Easing functions for custom animations
export const easings = {
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
  easeInElastic: [0.25, 0.46, 0.45, 0.94],
  easeOutElastic: [0.19, 1, 0.22, 1],
  easeInOutElastic: [0.61, 1, 0.88, 1],
} as const;

// Animation variants for different components
export const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: easings.easeOutBack 
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const modalVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: easings.easeOutBack
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: { duration: 0.3 }
  }
};
