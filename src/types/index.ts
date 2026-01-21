/**
 * Base geographic location interface used for all physical points of interest.
 */
export interface Location {
  name: string;
  address: string;
}

/**
 * Represents a Nice Healthcare provider and their starting/ending home base[cite: 3, 10].
 */
export interface Clinician extends Location {}

/**
 * Represents a facility where lab specimens are dropped off after a visit[cite: 7, 22].
 */
export interface Lab extends Location {}

/**
 * The calculated result of the dispatch algorithm used to update the UI[cite: 34].
 */
export interface DispatchResult {
  clinicianName: string;
  totalDistance: number; // In miles as required by technical specs
}