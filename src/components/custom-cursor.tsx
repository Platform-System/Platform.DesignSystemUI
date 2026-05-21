"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Track mouse position directly
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for smooth trailing effect (aura)
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only run on desktop/non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Detect interactive elements to expand the aura
      const isClickable = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer")
      setIsHovering(!!isClickable)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border transition-colors duration-200 ${
        isHovering 
          ? "bg-primary/10 border-primary/30 backdrop-blur-[2px]" 
          : "bg-primary/[0.03] border-primary/15 backdrop-blur-none"
      }`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 40,
        height: 40,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovering ? 1.6 : 1,
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 25 },
      }}
    >
      <motion.div 
        className="h-1.5 w-1.5 rounded-full bg-primary"
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.8
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
