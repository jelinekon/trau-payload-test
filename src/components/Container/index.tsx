import { cn } from '@/utilities/ui'
import { ContainerClient } from './Client'

export type ContainerProps = {
  background?: 'beige-dark' | 'beige-light' | 'beige-very-dark' | 'white' | 'black'
  children?: React.ReactNode
  className?: string
  withContainerClass?: boolean
}

export const Container: React.FC<ContainerProps> = (props) => {
  const { background, children, className, withContainerClass = true, ...rest } = props

  return (
    <div
      className={cn('relative', className, {
        container: withContainerClass,
        'bg-beige-dark': background === 'beige-dark',
        'bg-beige-light': background === 'beige-light',
        'bg-beige-very-dark': background === 'beige-very-dark',
        'bg-white': background === 'white',
        'text-white bg-dark': background === 'black',
      })}
      {...rest}
    >
      {/* <ContainerClient background={background} /> */}
      {children}
    </div>
  )
}
