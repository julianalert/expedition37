import Link from 'next/link'
import Image from 'next/image'

export default function HeaderLogo() {
  return (
    <Link className="block group" href="/" aria-label="Detour">
      <Image 
        src="/images/detour.svg" 
        alt="Detour" 
        width={120} 
        height={24}
        className="h-6"
        style={{ width: 'auto', height: 'auto', maxWidth: '120px', maxHeight: '24px' }}
      />
    </Link>
  )
}
