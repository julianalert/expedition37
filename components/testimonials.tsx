import Image from 'next/image'
import TestimonialsImage01 from '@/public/images/testimonial-01.jpg'
import TestimonialsImage02 from '@/public/images/testimonial-02.jpg'

export default function Testimonials() {
  return (
    <div className="my-12 md:my-16">
      <h2 className="text-3xl font-bold font-inter mb-10">They found their perfect destination with us 💜</h2>
      {/* Testimonials container */}
      <div className="space-y-10">
        {/* Item */}
        <div className="p-5 rounded-xl bg-teal-50 border border-teal-200 odd:rotate-1 even:-rotate-1 hover:rotate-0 transition duration-150 ease-in-out">
          <div className="flex items-center space-x-5">
            <div className="relative shrink-0">
              <Image className="rounded-full" src={TestimonialsImage01} width={102} height={102} alt="Testimonial 01" />
              <svg className="absolute top-0 right-0 fill-indigo-400" width={26} height={17} xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
              </svg>
            </div>
            <figure>
              <blockquote className="text-lg font-bold m-0 pb-1">
                <p>I can't believe it's free lol. Who needs ChatPT when you have Detour?</p>
              </blockquote>
              <figcaption className="text-sm font-medium">
              <span className="text-teal-500">Patrick</span> @ 37yo, from New-York, USA
              </figcaption>
            </figure>
          </div>
        </div>
        {/* Item */}
        <div className="p-5 rounded-xl bg-sky-50 border border-sky-200 odd:rotate-1 even:-rotate-1 hover:rotate-0 transition duration-150 ease-in-out">
          <div className="flex items-center space-x-5">
            <div className="relative shrink-0">
              <Image className="rounded-full" src={TestimonialsImage02} width={102} height={102} alt="Testimonial 02" />
              <svg className="absolute top-0 right-0 fill-indigo-400" width={26} height={17} xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
              </svg>
            </div>
            <figure>
              <blockquote className="text-lg font-bold m-0 pb-1">
                <p>I didn't know where to go for my next holiday, Detour helped me find and organize the perfect getaway.</p>
              </blockquote>
              <figcaption className="text-sm font-medium">
              <span className="text-sky-500">Anne</span> @ 32yo, from Paris, France{' '}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}