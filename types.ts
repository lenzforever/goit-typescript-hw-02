export interface ImageInterface {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    full: string;
    small: string;
  };
}