export type Service = { title: string; description: string; icon: string };
export type ProcessStep = { number: string; title: string; text: string };
export type Reason = { title: string; text: string };
export declare const business: {
  name: string;
  fullName: string;
  tagline: string;
  established: string;
  category: string;
  instagram: string;
  instagramUrl: string;
  followers: string;
  services: Service[];
  process: ProcessStep[];
  reasons: Reason[];
};