import type { Clinician, Lab } from '../types';

/**
 * Static list of clinicians provided for the technical assessment.
 * In a production environment, this would be fetched from an API/Database.
 */

export const CLINICIANS: Clinician[] = [
  { name: "Barb", address: "4120 Garfield Ave, Minneapolis, MN 55409" },
  { name: "Isaac", address: "140 104th Ln NW, Blaine MN 55448" },
  { name: "Marisol", address: "2393 Kalmia Ave, Boulder, CO 80304" },
  { name: "Mary", address: "608 Spruce Dr, Hudson, WI 54016" },
  { name: "Shawna", address: "1727 W Highland Pkwy, St Paul, MN 55116" },
  { name: "Shelly", address: "1232 3rd St, Hudson, WI 54016" },
  { name: "Tom", address: "14173 Flagstone Trail, Apple Valley MN 55124" }
];

/**
 * Available lab drop-off locations for journeys requiring specimen processing.
 */

export const LABS: Lab[] = [
  { name: "Edina Lab", address: "6525 France Ave, Edina, MN, 55435" },
  { name: "Medical Arts Lab", address: "835 Nicollet Mall, Minneapolis, MN 55402" },
  { name: "Bloomington Lab", address: "2716 E 82nd St, Bloomington, MN 55425" },
  { name: "Hudson Lab", address: "400 2nd St S, Hudson, WI 54016" },
  { name: "Boulder Lab", address: "4750 Nautilus Ct S, Boulder, CO 80381" }
];