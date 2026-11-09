'use client'

import { Tilt } from 'react-tilt'

import { cn } from '@/utilities/ui'

import Pricing from '@/../public/ui/pricing.svg'
import { Media } from '@/components/Media'
import RichText from '../RichText'
import { Button } from '../Button'

import styles from './styles.module.scss'

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 5000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
}

interface PricingModelProps {
  model: any
  calendlyLink?: string
}

export const PricingModel: React.FC<PricingModelProps> = ({ model, calendlyLink }) => {
  return (
    <Tilt className="h-full" options={defaultOptions}>
      <div className="flex flex-col h-full p-6 border border-white bg-beige-light rounded-2xl">
        <div className="flex justify-between mb-8 md:mb-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-beige-dark">
            <span className="w-full">
              <Pricing />
            </span>
          </div>
          {model.type && <p className="caption opacity-60">{model.type}</p>}
        </div>
        {model.title && <h3 className="mb-4 h2">{model.title}</h3>}
        {model.description && (
          <div className={cn(styles.description)}>
            <RichText data={model.description} enableGutter={false} />
          </div>
        )}
        <div className="flex items-end justify-between pt-12 mt-auto lg:pt-16">
          {model.price?.amount ? (
            <div>
              <p className="opacity-60">From</p>
              <p className="font-medium text-24">
                {'$' +
                  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
                    model.price.amount,
                  )}
                {model.price.period && (
                  <span className="font-normal body-s opacity-60">/{model.price.period}</span>
                )}
              </p>
            </div>
          ) : (
            <p className="font-medium text-24 opacity-30">Get in touch</p>
          )}
          {calendlyLink && (
            <div>
              <Button href={calendlyLink} label="Talk to us" color="transparent" />
            </div>
          )}
        </div>
      </div>
    </Tilt>
  )
}
