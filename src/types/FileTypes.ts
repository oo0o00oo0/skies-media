export type TFileList = File[] | FileList

type createdAt = {
  seconds: number
}

export type SkyData = {
  createdAt: createdAt
  updatedAt: string
  id: string
  name: string
  description: string
  image: string
  color: string
  colorData: number[]
  tags: string[]
}

export type ImageData = {
  img: HTMLImageElement
  data: []
}

export type StoreData = SkyData[]
