'use client'

export default function HeroButton() {
  const scrollToDestinations = () => {
    const element = document.getElementById('countries-grid')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button 
      className="btn text-white bg-indigo-500 hover:bg-indigo-600 shadow-xs" 
      onClick={scrollToDestinations}
    >
      Find your perfect destination
    </button>
  )
}
