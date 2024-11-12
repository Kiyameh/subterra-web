import React from 'react'

//* Hook para detectar si el usuario está haciendo scroll, y mostrar u ocultar elementos en función de ello.
//* @param timeout Tiempo en milisegundos que debe pasar para que se oculte el elemento.

const useScrollingVisibility = (timeout: number = 1000) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(false)
      }, timeout)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [timeout])

  return isVisible
}

export default useScrollingVisibility
