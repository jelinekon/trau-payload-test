import { cn } from '@/utilities/ui'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { ProjectsBlock as ProjectsBlockProps, Project } from '@/payload-types'
import { ProjectCard } from '@/components/ProjectCard'
import { Container } from '@/components/Container'

export const ProjectsBlock: React.FC<ProjectsBlockProps> = async (props) => {
  const { projects, selectionType, settings } = props

  let resolvedProjects: Project[] = []

  if (selectionType === 'automatic') {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      pagination: false,
      depth: 1,
      where: {
        _status: { equals: 'published' },
      },
    })
    resolvedProjects = result.docs
  } else {
    resolvedProjects = (projects ?? []).filter((p): p is Project => typeof p !== 'string')
  }

  return (
    <div className="relative overflow-hidden">
      <Container background={settings?.backgroundColor}>
        <div className="py-20 md:py-40">
          {resolvedProjects.length > 0 && (
            <div>
              {resolvedProjects.map((project, index) => (
                <div key={project.id ?? index}>
                  <ProjectCard project={project} order={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
