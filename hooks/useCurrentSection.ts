import React from 'react'

//* Hook que retorna la sección actual en la que se encuentra la pagina, basandose en su id.
//* @param sections - Arreglo de objetos con al menos la propiedad id.

type Section = {id: string}

export default function useCurrentSection(sections: Array<Section>) {
  const [currentSection, setCurrentSection] = React.useState(sections[0].id)

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
      setCurrentSection(currentSection?.id || sections[0].id)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return currentSection
}
