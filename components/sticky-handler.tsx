'use client'

import { useEffect } from 'react'

const Sticky = require('sticky-js')

export default function StickyHandler() {
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const stickyEls = document.querySelectorAll('[data-sticky]')
      if (stickyEls.length > 0) {
        const sticky = new Sticky('[data-sticky]')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null // This component doesn't render anything
}
