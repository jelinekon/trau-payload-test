import { Project } from '@/payload-types'
import { Media } from '../Media'

import { cn } from '@/utilities/ui'

import { Join } from '@/components/Join'
import { Container } from '../Container'

export type ProjectFooterProps = Pick<Project, 'credits'>

export const ProjectFooter: React.FC<{
  project: ProjectFooterProps
}> = ({ project }) => {
  const { credits } = project

  if (!credits?.roles || credits.roles.length === 0) {
    return null
  }

  return (
    <Container>
      <div className="grid-cols-1 px-4 -mx-4 -mt-px border-t border-b max-md:pt-8 border-black/20 md:grid md:grid-cols-2">
        <div className="relative pb-8 md:p-10 max-md:border-b md:border-r border-black/20">
          <p className="mb-4 whitespace-pre caption">(&nbsp; credits &nbsp;)</p>
        </div>

        <div className="relative pt-4 pb-12 pl-4 md:pb-28 md:p-10 max-md:ml-10 max-md:border-l border-black/20">
          <Join
            verticalAlign="top"
            horizontalAlign="left"
            displayFrom="sm"
            className="-mt-px -mr-px"
          />
          <Join
            verticalAlign="bottom"
            horizontalAlign="left"
            rotated
            className="translate-y-px"
            displayFrom="sm"
          />
          <ul className="md:columns-2">
            {credits.roles.map((credit, index) => {
              if (typeof credit === 'number') return null
              return (
                <li key={index} className="break-inside-avoid pb-6 md:pb-8">
                  <p className="mb-2 md:mb-4 caption">
                    {typeof credit === 'object' && credit.role}
                  </p>
                  <p>
                    {typeof credit.people === 'object' &&
                      credit.people &&
                      credit.people
                        .map((person) => (typeof person === 'object' ? person.name : ''))
                        .join(', ')}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Container>
  )
}
