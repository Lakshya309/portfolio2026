export const slide = {
    initial: {
      x: "100%",
    },
    enter: (i) => ({
      x: "0%",
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0],
        delay: 0.05 * i,
      },
    }),
    exit: (i) => ({
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0],
        delay: 0.05 * i,
      },
    }),
  };
  
  export const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  export const stagger = {
    enter: {
        transition: {
            staggerChildren: 0.1
        }
    },
    exit: {
        transition: {
            staggerChildren: 0.1
        }
    }
  }