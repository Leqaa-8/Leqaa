import { useRef } from 'react'
import { gsap } from 'gsap'

export function useCurtainAnimation(onComplete) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const sealWrapperRef = useRef(null)
  const isAnimating = useRef(false)

  const openCurtains = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
        if (onComplete) onComplete()
      },
    })

    // Seal signals the opening with a slight rotation
    tl.to(sealWrapperRef.current, {
      rotation: 6,
      duration: 0.4,
      ease: 'power2.inOut',
    })

    // Heavy fabric tension — curtains stretch before releasing
    .to([leftRef.current, rightRef.current], {
      scaleX: 1.018,
      skewY: 0.4,
      duration: 0.28,
      ease: 'power1.in',
    })

    // Seal fades as curtains begin to move
    .to(
      sealWrapperRef.current,
      {
        opacity: 0,
        scale: 0.82,
        duration: 0.5,
        ease: 'power2.in',
      },
      '-=0.12'
    )

    // Left curtain sweeps out — power4.inOut gives heavy fabric deceleration
    .to(
      leftRef.current,
      {
        x: '-100%',
        scaleX: 1,
        skewY: 0,
        duration: 2,
        ease: 'power4.inOut',
      },
      '-=0.18'
    )

    // Right curtain simultaneous
    .to(
      rightRef.current,
      {
        x: '100%',
        scaleX: 1,
        skewY: 0,
        duration: 2,
        ease: 'power4.inOut',
      },
      '<'
    )

    return tl
  }

  return { leftRef, rightRef, sealWrapperRef, openCurtains }
}
