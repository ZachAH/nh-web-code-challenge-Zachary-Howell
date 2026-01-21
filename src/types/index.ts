/**
 * Core geographic coordinates used for Haversine calculations.
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Base geographic location interface. 
 * Inherits Coordinates to ensure every location is geocoded.
 */
export interface Location extends Coordinates {
  name: string;
  address: string;
}

/**
 * Represents a Nice Healthcare provider.
 * We extend Location to keep the domain model DRY (Don't Repeat Yourself).
 */
export interface Clinician extends Location {
  // Potential future fields: specialty: string; currentLoad: number;
}

/**
 * Represents a facility for lab specimen drop-offs.
 */
export interface Lab extends Location {}

/**
 * The final output of the dispatch algorithm.
 * Round-trip distance is prioritized to minimize clinician travel time.
 */
export interface DispatchResult {
  clinicianName: string;
  totalDistance: number; 
}