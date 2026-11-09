import type { Contact, ServicesBlock as ServicesBlockProps } from '@/payload-types'
import { ServicesBlockClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const ServicesBlock: React.FC<ServicesBlockProps> = async (props) => {
  const contactData: Contact = await getCachedGlobal('contact', 1)()

  return <ServicesBlockClient {...props} contact={contactData} />
}
