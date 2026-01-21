import type { Clinician, Lab } from '../types';

// Added coordinates for Haversine calculation 
export const CLINICIANS: (Clinician & { lat: number, lng: number })[] = [
  { name: "Barb", address: "4120 Garfield Ave, Minneapolis, MN 55409", lat: 44.928, lng: -93.281 },
  { name: "Isaac", address: "140 104th Ln NW, Blaine MN 55448", lat: 45.168, lng: -93.232 },
  { name: "Marisol", address: "2393 Kalmia Ave, Boulder, CO 80304", lat: 40.038, lng: -105.263 },
  { name: "Mary", address: "608 Spruce Dr, Hudson, WI 54016", lat: 44.975, lng: -92.741 },
  { name: "Shawna", address: "1727 W Highland Pkwy, St Paul, MN 55116", lat: 44.912, lng: -93.181 },
  { name: "Shelly", address: "1232 3rd St, Hudson, WI 54016", lat: 44.965, lng: -92.756 },
  { name: "Tom", address: "14173 Flagstone Trail, Apple Valley MN 55124", lat: 44.743, lng: -93.208 }
];

export const LABS: (Lab & { lat: number, lng: number })[] = [
  { name: "Edina Lab", address: "6525 France Ave, Edina, MN, 55435", lat: 44.885, lng: -93.330 },
  { name: "Medical Arts Lab", address: "835 Nicollet Mall, Minneapolis, MN 55402", lat: 44.977, lng: -93.272 },
  { name: "Bloomington Lab", address: "2716 E 82nd St, Bloomington, MN 55425", lat: 44.856, lng: -93.234 },
  { name: "Hudson Lab", address: "400 2nd St S, Hudson, WI 54016", lat: 44.973, lng: -92.759 },
  { name: "Boulder Lab", address: "4750 Nautilus Ct S, Boulder, CO 80381", lat: 40.060, lng: -105.207 }
];