import React from 'react'

/**
 * Retorna la sección actual en la que se encuentra la página, basandose en su id.
 * @param {{id:sring}[]} sections -  Arreglo de objetos con, al menos, la propiedad id.
 * @returns {string} currentSectionId - Id de la sección actual
 */

const useCurrentSection = (sections: {id: string}[]) => {
  const [currentSectionId, setCurrentSectionId] = React.useState(sections[0].id)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const currentSection = sections.find((section) => {
        const sectionElement = document.getElementById(section.id)
        if (!sectionElement) return false
        const sectionTop = sectionElement.offsetTop
        const sectionBottom =
          sectionElement.offsetTop + sectionElement.offsetHeight
        return currentScroll >= sectionTop && currentScroll < sectionBottom
      })
      setCurrentSectionId(currentSection?.id || sections[0].id)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return currentSectionId
}

export default useCurrentSection
