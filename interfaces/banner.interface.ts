export interface IMedia {
  src: string
  height: number
  width: number
}

export interface IBannerImage {
  desktop: IMedia,
  mobile: IMedia
}


export enum BANNER_POSITION {
  HERO = 'hero'
}

export interface IBanner {
  id: string,
  imagen: IBannerImage,
  text: string
}