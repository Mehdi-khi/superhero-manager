export interface Hero {
  _id: string;
   id: number;
  name: string;
  slug: string;
  image?: string;
  images?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  powerstats?: {
    intelligence?: number;
    strength?: number;
    speed?: number;
    durability?: number;
    power?: number;
    combat?: number;
  };
  biography?: {
    fullName?: string;
    publisher?: string;
    aliases?: string[];
    alignment?: string;
  };
}