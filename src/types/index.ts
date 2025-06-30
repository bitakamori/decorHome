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

export interface CollectionImage {
  id: string
  url: string
  alt: string
  title: string
  price?: number
  shopUrl?: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  images: CollectionImage[]
  featured: CollectionImage[]
}

