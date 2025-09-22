import Link from 'next/link'
import Image from 'next/image'

export default function HeaderLogo() {
  return (
    <Link className="block group" href="/" aria-label="Detour">
      <Image 
        src="/images/detour.svg" 
        alt="Detour" 
        width={180} 
        height={36}
        className="h-9 w-auto"
      />
    </Link>
  )
}
