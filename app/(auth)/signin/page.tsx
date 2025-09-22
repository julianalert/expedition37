import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'

const metadataConfig: MetadataConfig = {
  seo: {
    title: `Sign In to ${SITE_CONFIG.name} - Access Your Travel Account`,
    description: `Sign in to your ${SITE_CONFIG.name} account to access personalized travel recommendations, save your favorite destinations, and connect with our travel community.`,
    keywords: [
      'sign in',
      'login',
      'travel account',
      'user account',
      'travel community',
      'personalized travel',
      'travel recommendations',
      'Detour login'
    ],
    canonical: `${SITE_CONFIG.url}/signin`,
    robots: 'noindex, nofollow', // Auth pages typically shouldn't be indexed
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: `Sign In to ${SITE_CONFIG.name}`,
    description: `Access your travel account to get personalized destination recommendations and connect with fellow travelers.`,
    url: `${SITE_CONFIG.url}/signin`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/Detour-og-image.png`,
        width: 1200,
        height: 630,
        alt: `Sign in to ${SITE_CONFIG.name}`,
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitter,
    creator: SITE_CONFIG.twitter,
    title: `Sign In to ${SITE_CONFIG.name}`,
    description: `Access your travel account for personalized destination recommendations.`,
    images: [`${SITE_CONFIG.url}/images/Detour-og-image.png`],
  },
}

export const metadata = generateMetadataUtil(metadataConfig)

export default function SignIn() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-inter mb-2">Sign in to JobBoard!</h1>
        <div className="text-gray-500">Enter your email and we'll email you a magic link for a password-free sign in.</div>
      </div>

      {/* Form */}
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input id="email" className="form-input w-full" type="email" required />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 shadow-xs group">
            Get Magic Link{' '}
            <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="border-t border-gray-200 grow mr-3" aria-hidden="true" />
        <div className="text-sm text-gray-500 italic">Or</div>
        <div className="border-t border-gray-200 grow ml-3" aria-hidden="true" />
      </div>

      {/* Social login */}
      <button className="btn text-sm text-white bg-rose-500 hover:bg-rose-600 w-full relative flex after:flex-1 group">
        <div className="flex-1 flex items-center">
          <svg className="w-4 h-4 fill-current text-rose-200 shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.679 6.545H8.043v3.273h4.328c-.692 2.182-2.401 2.91-4.363 2.91a4.727 4.727 0 1 1 3.035-8.347l2.378-2.265A8 8 0 1 0 8.008 16c4.41 0 8.4-2.909 7.67-9.455Z" />
          </svg>
        </div>
        <span className="flex-auto text-rose-50 pl-3">
          Continue With Google
          <span className="inline-flex tracking-normal text-rose-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
            -&gt;
          </span>
        </span>
      </button>   
    </>
  )
}
