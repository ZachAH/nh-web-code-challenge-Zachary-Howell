# 🏥 Nice Healthcare: Clinician Dispatch Dashboard

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A specialized internal tool designed for healthcare coordinators to efficiently assign clinicians to home visits by calculating optimal round-trip travel distances.

---

## 🚀 Technical Approach

- **Deterministic Logic (Bonus)**: To exceed the requirement for a random distance generator, I implemented the **Haversine Formula**. This ensures consistent, mathematically sound results by calculating the "as-the-crow-flies" distance between geographic coordinates.
- **Loop Logic**:
  - **Standard Visit**: Home → Patient → Home.
  - **Lab Visit**: Home → Patient → Optimal Lab → Home.
- **State Management**: Developed using React hooks with explicit **loading states** to prevent UI flickering and eliminate infinite re-render loops. Used `useMemo` and `useCallback` for optimized performance.

---

## 🏗️ Project Structure
The project follows a modular architecture to ensure separation of concerns:
- `src/components`: UI Presentation layer (Dashboard).
- `src/utils`: Business and mathematical logic (Haversine/Dispatch algorithms).
- `src/data`: Mock data stores.
- `src/types`: Centralized TypeScript interfaces.

---

## 🧠 Assumptions

1.  **Optimal Lab Selection**: I assumed the "best" lab is the one that minimizes the **total round-trip** for the clinician (Home → Patient → Lab → Home), rather than simply the lab closest to the patient.
2.  **Patient Location**: As no Geocoding API was provided, the system currently anchors the patient's coordinates to **Central Minneapolis** (44.9778° N, 93.2650° W) for demonstration purposes.

---

## 🛠️ Production Considerations

### 1. MVP Limiting Factors & User Issues
* **Geocoding Strategy**: In production, a Geocoding API (e.g., Google Maps) would convert the `patientAddress` string into real-time latitude/longitude data.
* **Geographic Impediments**: A production app must account for actual road networks and traffic rather than just "as-the-crow-flies" distance.
* **Data Architecture**: National scaling would require a backend with spatial indexing (e.g., PostGIS) rather than static JSON files.

### 2. Optimization Factors (Future Roadmap)
* **Clinician Specialty Matching**: Aligning patient needs (e.g., pediatric expertise) with provider credentials.
* **Load Balancing**: Preventing provider burnout by factoring in current daily workloads.
* **Shift Management**: Cross-referencing route duration with remaining shift hours to avoid overtime.

---

## 📦 Installation & Setup

1. **Clone and Install**:
   ```bash
   npm install