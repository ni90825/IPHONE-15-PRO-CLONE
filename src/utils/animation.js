import gsap from "gsap";

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeline.to(
      firstTarget,
      {
        ...animationProps,
        ease: 'power2.inOut'
      },
    //   '<'
    )
  
    timeline.to(
      secondTarget,
      {
        ...animationProps,
        ease: 'power2.inOut'
      },
    //   '<'
    )
  }