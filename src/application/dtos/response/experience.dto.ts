export type ExperienceDto = {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: number;
  imagesUrls: string[];
  dates: Date[];
  type: string;
  capacity: number;
};
