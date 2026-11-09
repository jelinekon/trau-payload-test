import { Contact } from '@/payload-types'
import { cn } from '@/utilities/ui'

// export type SocialLinksProps = Pick<Contact, 'socialLinks'>

type BackgroundVariant = 'light' | 'dark'

interface SocialLinksProps {
  socialLinks?: Contact['socialLinks']
  background?: BackgroundVariant
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks, background }) => {
  if (!socialLinks || socialLinks.length === 0) return null

  return (
    <>
      <p className="mb-2 opacity-50 caption md:mb-4">Follow Us</p>
      <ul className="flex flex-col gap-2">
        {socialLinks.map((socialLink, i) => {
          const { link, label } = socialLink

          if (!link || !label) return null

          return (
            <li key={i} className="leading-none">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('transition-colors ', {
                  'text-white/70 hover:text-white': background === 'dark',
                })}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
