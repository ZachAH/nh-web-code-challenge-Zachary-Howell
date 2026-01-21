import { CLINICIANS, LABS } from '../data/mockData';
import type { DispatchResult } from '../types';

/**
 * Requirement: Returns a random distance between 1 and 100.
 */
export const getDistance = (addr1: string, addr2: string): number => {
  console.log(`Calculating distance between ${addr1} and ${addr2}`);
  return Math.floor(Math.random() * 100) + 1;
};

/**
 * Action: Finds the optimal clinician based on minimizing total drive time.
 */
export const findOptimalClinician = (
  patientAddress: string, 
  requiresLab: boolean
): DispatchResult => {
  
  const results = CLINICIANS.map((clinician) => {
    let totalDistance = 0;

    if (!requiresLab) {
      // Loop 1: Clinician Home -> Patient -> Clinician Home 
      const homeToPatient = getDistance(clinician.address, patientAddress);
      const patientToHome = getDistance(patientAddress, clinician.address);
      totalDistance = homeToPatient + patientToHome;
    } else {
      // Loop 2: Clinician Home -> Patient -> Lab -> Clinician Home 
      // Assumption: We find the lab that minimizes this specific clinician's total trip.
      const homeToPatient = getDistance(clinician.address, patientAddress);
      
      const labTripDistances = LABS.map(lab => {
        const patientToLab = getDistance(patientAddress, lab.address);
        const labToHome = getDistance(lab.address, clinician.address);
        return patientToLab + labToHome;
      });

      totalDistance = homeToPatient + Math.min(...labTripDistances);
    }

    return {
      clinicianName: clinician.name,
      totalDistance
    };
  });

  // Sort by shortest distance and return the best one
  return results.sort((a, b) => a.totalDistance - b.totalDistance)[0];
};