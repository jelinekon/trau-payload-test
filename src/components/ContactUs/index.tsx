import type { Contact } from '@/payload-types'
import { cn } from '@/utilities/ui'

type BackgroundVariant = 'light' | 'dark'

interface ContactUsProps {
  phone?: Contact['phone']
  email?: Contact['email']
  background?: BackgroundVariant
}

export const ContactUs: React.FC<ContactUsProps> = ({ phone, email, background }) => {
  if (!phone && !email) return null

  return (
    <>
      <p className="mb-2 opacity-50 caption md:mb-4">New Business</p>
      <ul className="flex flex-col">
        {phone && (
          <li>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={cn('transition-colors ', {
                'text-white/70 hover:text-white': background === 'dark',
              })}
            >
              {phone}
            </a>
          </li>
        )}
        {email && (
          <li>
            <a
              href={`mailto:${email}`}
              className={cn('transition-colors ', {
                'text-white/70 hover:text-white': background === 'dark',
              })}
            >
              {email}
            </a>
          </li>
        )}
      </ul>
    </>
  )
}
