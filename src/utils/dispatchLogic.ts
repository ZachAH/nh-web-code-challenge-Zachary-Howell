import { CLINICIANS, LABS } from '../data/mockData';
import type { DispatchResult } from '../types';

/**
 * Bonus: Haversine formula to calculate "crow-flies" distance.
 * This replaces the random generator to provide deterministic, consistent results.
 */
export const calculateHaversineDistance = (
    lat1: number, lon1: number,
    lat2: number, lon2: number
): number => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Using one decimal place for better mileage precision
    const distance = R * c;
    return Math.round(distance * 10) / 10;
};

/**
 * Action: Finds the optimal clinician based on minimizing total drive time.
 * Logic accounts for standard visits and lab-required visits.
 */
export const findOptimalClinician = (
    _patientAddress: string,
    requiresLab: boolean
): DispatchResult => {
    // Guard Clause: Ensure we have clinicians to evaluate
    if (!CLINICIANS || CLINICIANS.length === 0) {
        throw new Error("No clinicians available for dispatch.");
    }

    /**
     * ARCHITECTURAL NOTE: 
     * In a production environment, the 'patientAddress' string would be sent to a 
     * Geocoding API to retrieve precise coordinates.
     */
    const patientLat = 44.9778;
    const patientLng = -93.2650;

    // Optimization: Pre-calculate distance from Patient to each Lab once
    // instead of inside the Clinician loop.
    const patientToLabDistances = requiresLab
        ? LABS.map(lab => ({
            lab,
            dist: calculateHaversineDistance(patientLat, patientLng, lab.lat, lab.lng)
        }))
        : [];

    const results = CLINICIANS.map((clinician) => {
        const homeToPatient = calculateHaversineDistance(
            clinician.lat, clinician.lng,
            patientLat, patientLng
        );

        let totalDistance = 0;

        if (!requiresLab) {
            // Loop: Home -> Patient -> Home
            totalDistance = homeToPatient * 2;
        } else {
            // Find the lab that minimizes the total trip for THIS specific clinician
            const totalTripDistances = patientToLabDistances.map(item => {
                const labToHome = calculateHaversineDistance(item.lab.lat, item.lab.lng, clinician.lat, clinician.lng);
                return homeToPatient + item.dist + labToHome;
            });

            totalDistance = Math.min(...totalTripDistances);
        }

        return {
            clinicianName: clinician.name,
            totalDistance: Math.round(totalDistance * 10) / 10 // Final rounding
        };
    });

    // Sort by shortest distance and return the best match
    return results.sort((a, b) => a.totalDistance - b.totalDistance)[0];
};