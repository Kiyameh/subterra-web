'use client'

import {useState, useRef, type ReactNode, useEffect} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Button} from '@/components/ui/button'

interface HorizontalScrollAreaProps {
  children: ReactNode
  className?: string
  scrollAmount?: number
  startAtEnd?: boolean
}

export function HorizontalScrollArea({
  children,
  className = '',
  scrollAmount = 70,
  startAtEnd = false,
}: HorizontalScrollAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const currentScroll = scrollContainerRef.current.scrollLeft

    scrollContainerRef.current.scrollTo({
      left:
        direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (startAtEnd && scrollContainerRef.current) {
      const {scrollWidth, clientWidth} = scrollContainerRef.current
      scrollContainerRef.current.scrollLeft = scrollWidth - clientWidth

      // Update scroll indicators after setting position
      setCanScrollLeft(true)
      setCanScrollRight(false)
    }
  }, [startAtEnd])

  return (
    <div className={`relative w-full ${className}`}>
      {/* Left scroll button */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden gap-5 py-4 px-10"
        onScroll={handleScroll}
      >
        {children}
      </div>

      {/* Right scroll button */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
