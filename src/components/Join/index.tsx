import { cn } from '@/utilities/ui'

type BackgroundColor = 'beige-dark' | 'beige-light' | 'beige-very-dark' | 'black' | 'white'

export type JoinProps = {
  backgroundColor?: BackgroundColor | null
  verticalAlign?: 'top' | 'bottom'
  horizontalAlign?: 'left' | 'center' | 'right'
  displayFrom?: 'sm' | 'md' | 'lg' | 'xl'
  rotated?: boolean
  className?: string
}

export const Join: React.FC<JoinProps> = ({
  backgroundColor,
  verticalAlign = 'top',
  horizontalAlign = 'right',
  displayFrom = 'lg',
  rotated,
  className,
}) => {
  return (
    <span
      className={cn(className, 'absolute right-0 w-3 h-px ', {
        hidden: displayFrom !== 'sm',
        'md:block': displayFrom === 'md' || displayFrom === 'lg',
        'lg:block': displayFrom === 'lg',
        'top-0': verticalAlign === 'top',
        '-translate-y-px': verticalAlign === 'top' && !className,
        'bottom-0': verticalAlign === 'bottom',
        'translate-y-px': verticalAlign === 'bottom' && !className,
        'right-0 translate-x-1/2': horizontalAlign === 'right',
        'left-0 -translate-x-1/2 ': horizontalAlign === 'left',
        'left-1/2 -translate-x-1/2 ': horizontalAlign === 'center',
        'rotate-180': rotated,
        'bg-white': backgroundColor === 'black',
        'bg-black': backgroundColor !== 'black',
      })}
    >
      <span
        className={cn('absolute w-px h-[0.375rem] -translate-x-px left-1/2', {
          'bg-black': backgroundColor !== 'black',
          'bg-white': backgroundColor === 'black',
        })}
      ></span>
    </span>
  )
}
