import Link from 'next/link'
import Image from 'next/image'

export default function HeaderLogo() {
  return (
    <Link className="block group" href="/" aria-label="Expedition37">
      <Image 
        src="/images/detour.svg" 
        alt="Expedition37" 
        width={180} 
        height={36}
        className="h-9 w-auto"
      />
    </Link>
  )
}
