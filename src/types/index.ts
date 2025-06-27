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
