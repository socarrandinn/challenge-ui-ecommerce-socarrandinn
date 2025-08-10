export interface IImageMedia {
  src: string
  height: number
  width: number
}

export interface IBannerImage {
  desktop: IImageMedia,
  mobile: IImageMedia
}

export interface IBanner {
  id: string,
  imagen: IBannerImage,
  text: string
}


export enum BANNER_POSITION {
  HERO = 'hero'
}
