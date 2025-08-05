'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import './ProductNav.css'

const ProductNav = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showBottomIndicator, setShowBottomIndicator] = useState(true)
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const animationFrameId = useRef(null)
  const lastActiveIndex = useRef(-1)

  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const scrollTopStart = useRef(0)

  const products = [
    { number: '1', name: 'Radiant', tag: 'Innovation' },
    { number: '2', name: 'Zigma', tag: 'Precision' },
    { number: '3', name: 'Spectre', tag: 'Elegance' },
    { number: '4', name: 'Nova', tag: 'Power' },
    { number: '5', name: 'Pulse', tag: 'Energy' },
    { number: '6', name: 'Quantum', tag: 'Technology' },
    { number: '7', name: 'Nexus', tag: 'Connection' },
    { number: '8', name: 'Vortex', tag: 'Motion' },
    { number: '9', name: 'Aether', tag: 'Space' }
  ]

  const calculateActiveIndex = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const containerRect = container.getBoundingClientRect()

    const computedStyle = window.getComputedStyle(container)
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0

    let closestIndex = 0
    let maxScore = 0

    itemsRef.current.forEach((item, index) => {
      if (!item) return

      const itemRect = item.getBoundingClientRect()
      const visibleTop = Math.max(containerRect.top + paddingTop, itemRect.top)
      const visibleBottom = Math.min(containerRect.bottom - paddingBottom, itemRect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)

      const itemCenter = (itemRect.top + itemRect.bottom) / 2
      const containerCenter = (containerRect.top + containerRect.bottom) / 2
      const centerWeight = 1 - Math.abs(itemCenter - containerCenter) / (containerRect.height * 0.7)

      const score = visibleHeight * centerWeight
      if (score > maxScore) {
        maxScore = score
        closestIndex = index
      }
    })

    if (scrollTop <= 1) closestIndex = 0
    if (scrollTop + clientHeight >= scrollHeight - 1) closestIndex = itemsRef.current.length - 1

    if (closestIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = closestIndex
      setActiveIndex(closestIndex)
    }

    setShowBottomIndicator(scrollTop + clientHeight < scrollHeight - paddingBottom)
  }, [])

  const handleScroll = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
    animationFrameId.current = requestAnimationFrame(calculateActiveIndex)
  }, [calculateActiveIndex])

  const startDragging = useCallback((e) => {
    setIsDragging(true)
    const container = containerRef.current
    startY.current = e.clientY || e.touches?.[0].clientY
    scrollTopStart.current = container.scrollTop
    container.style.cursor = 'grabbing'
    container.style.scrollBehavior = 'auto' // Deaktiviere Smooth-Scroll während Drag
    e.preventDefault()
  }, [])
  
  const stopDragging = useCallback(() => {
    setIsDragging(false)
    const container = containerRef.current
    container.style.cursor = ''
    container.style.scrollBehavior = ''
  
    // Direkt zum aktiven Produkt scrollen
    scrollToProduct(activeIndex)
  }, [activeIndex]) // Füge activeIndex als Dependency hinzu
  
  
  const handleDragging = useCallback((e) => {
    if (!isDragging) return
  
    const update = () => {
      const currentY = e.clientY || e.touches?.[0].clientY
      const delta = startY.current - currentY
      const newScroll = scrollTopStart.current + delta
      
      // Begrenze den Scroll-Bereich
      const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight
      const clampedScroll = Math.max(0, Math.min(maxScroll, newScroll))
      
      // Vermeide unnötige Updates
      if (containerRef.current.scrollTop !== clampedScroll) {
        containerRef.current.scrollTop = clampedScroll
        calculateActiveIndex()
      }
    }
  
    // Nutze requestAnimationFrame für flüssige Updates
    animationFrameId.current = requestAnimationFrame(update)
    e.preventDefault()
  }, [isDragging, calculateActiveIndex])

const scrollToProduct = useCallback((index) => {
  const item = itemsRef.current[index]
  const container = containerRef.current
  if (item && container) {
    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    
    // Präzise Positionierung mit Offset-Korrektur
    const targetPosition = item.offsetTop - 
      (container.clientHeight - item.clientHeight) / 2
    
    container.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}, [])
  

  useEffect(() => {
    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll)
    return () => {
      container?.removeEventListener('scroll', handleScroll)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleScroll])

  useEffect(() => {
    calculateActiveIndex()
  }, [calculateActiveIndex])

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      onMouseDown={startDragging}
      onMouseMove={handleDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {products.map((product, index) => (
        <section
          key={index}
          ref={el => itemsRef.current[index] = el}
          className={`scroll-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => scrollToProduct(index)}
        >
          <div className="content-wrapper">
            <div className="index">0{product.number}</div>
            <div className="text-container">
              <span className="category">{product.tag}</span>
              <h2 className="product-title">
                <span className="title-deco"></span>
                {product.name}
              </h2>
            </div>
          </div>
        </section>
      ))}

      <div className="scroll-indicator bottom" data-visible={showBottomIndicator}>
        <div className="chevron"></div>
      </div>
    </div>
  )
}

export default ProductNav
