'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const {
    autoplay = false,
    loop = false,
    muted = false,
    resource,
    videoClassName,
    onPlay,
    onPause,
    onClick,
  } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // Handle video suspend event if needed
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url, updatedAt } = resource

    return (
      <video
        autoPlay={autoplay}
        className={cn(videoClassName, {
          'cursor-pointer': !autoplay,
        })}
        controls={false}
        loop={loop}
        muted={muted}
        onClick={() => {
          onClick && onClick()
          if (videoRef.current && !autoplay) {
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
          }
        }}
        onPlay={onPlay} // Trigger onPlay event
        onPause={onPause} // Trigger onPause event
        playsInline
        preload="metadata"
        ref={videoRef}
      >
        <source src={getMediaUrl(url, updatedAt)} />
      </video>
    )
  }

  return null
}
