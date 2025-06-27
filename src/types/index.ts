export interface ImageCardData {
  id: string
  src: string
  alt: string
  title: string
  description: string
}

export interface ImageCardProps {
  data: ImageCardData
  priority?: boolean
}

export interface CarouselImage {
  id: string
  src: string
  alt: string
  title?: string
}

export interface GiftCarouselProps {
  images: CarouselImage[]
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
  showNavigation?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export interface GiftIdeasSectionProps {
  title?: string
  description?: string
  image?: {
    src: string
    alt: string
  }
  className?: string
}
