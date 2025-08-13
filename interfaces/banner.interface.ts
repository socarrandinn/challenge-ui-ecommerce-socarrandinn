export interface IImageMedia {
  src: string
  thumb: string
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


export enum BANNER_COLLECTION {
  HERO = 'hero',
  BANNER_CARD = 'card',
  BANNER_FOUR = 'banner-four',
  MINI_1 = 'mini-1',
  MINI_2 = 'mini-2',
}
