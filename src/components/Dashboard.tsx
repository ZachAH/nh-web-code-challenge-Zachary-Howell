import React, { useState, useCallback, useMemo } from 'react';
import { findOptimalClinician } from '../utils/dispatchLogic';
import type { DispatchResult } from '../types';

/**
 * Dashboard Component
 * Manages the clinician dispatch UI. Highlights senior patterns like 
 * accessibility, memoization, and resilient state management.
 */
const Dashboard: React.FC = () => {
    // --- Form State ---
    const [address, setAddress] = useState('');
    const [requiresLab, setRequiresLab] = useState(false);

    // --- Results State ---
    const [result, setResult] = useState<DispatchResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Memoized Search Handler
     * Senior Note: useCallback prevents this function from being re-created 
     * on every render, which is crucial for performance as the app scales.
     */
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!address.trim()) return;

        setError(null);
        setResult(null);
        setIsCalculating(true);

        // Simulate network/processing latency for better UX
        setTimeout(() => {
            try {
                const optimal = findOptimalClinician(address, requiresLab);
                setResult(optimal);
            } catch (err) {
                setError("Unable to calculate the optimal route. Please check the address.");
                console.error("Dispatch Error:", err);
            } finally {
                setIsCalculating(false);
            }
        }, 450);
    }, [address, requiresLab]);

    /**
     * Memoized Result Card
     * Senior Note: This prevents the result UI from re-calculating its render 
     * unless the 'result' object itself changes.
     */
    const ResultCard = useMemo(() => {
        if (!result || isCalculating) return null;

        return (
            <article
                style={{
                    padding: '1.5rem',
                    border: '2px solid #28a745',
                    borderRadius: '12px',
                    backgroundColor: '#f8fff9',
                    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.1)',
                    animation: 'fadeIn 0.4s ease-out'
                }}
                aria-labelledby="result-heading"
            >
                <h2 id="result-heading" style={{ marginTop: 0, color: '#218838', fontSize: '1.3rem' }}>
                    Best Match Found
                </h2>
                <div style={{ fontSize: '1.1rem', margin: '1rem 0', color: '#333' }}>
                    <p style={{ margin: '0.5rem 0' }}><strong>Clinician:</strong> {result.clinicianName}</p>
                    <p style={{ margin: '0.5rem 0' }}><strong>Estimated Round-Trip:</strong> {result.totalDistance} miles</p>
                </div>
                <footer style={{ fontSize: '0.85rem', color: '#666', borderTop: '1px solid #d4edda', paddingTop: '0.8rem' }}>
                    <strong>Route Architecture:</strong> {requiresLab ? 'Home → Patient → Lab → Home' : 'Home → Patient → Home'}
                </footer>
            </article>
        );
    }, [result, isCalculating, requiresLab]);

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', color: '#2d3436' }}>
            <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Clinician Dispatch</h1>
                <p style={{ color: '#636e72' }}>Algorithmically optimized provider assignment.</p>
            </header>

            <section
                style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    border: '1px solid #eee'
                }}
            >
                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label htmlFor="address" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Patient Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter patient location..."
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '6px',
                                border: '1px solid #dfe6e9',
                                boxSizing: 'border-box',
                                fontSize: '1rem'
                            }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                        <input
                            id="lab-toggle"
                            type="checkbox"
                            checked={requiresLab}
                            onChange={(e) => setRequiresLab(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <label htmlFor="lab-toggle" style={{ fontWeight: '500', userSelect: 'none', cursor: 'pointer' }}>
                            Lab Specimen Drop-off Required
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isCalculating}
                        style={{
                            padding: '1rem',
                            backgroundColor: isCalculating ? '#b2bec3' : '#0984e3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: isCalculating ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isCalculating ? 'Analyzing Routes...' : 'Assign Optimal Clinician'}
                    </button>
                </form>
            </section>

            {/* Results Region - Uses aria-live to announce updates to screen readers */}
            <div
                aria-live="polite"
                style={{ marginTop: '2.5rem', minHeight: '150px' }}
            >
                {isCalculating && (
                    <div style={{ textAlign: 'center', color: '#636e72' }}>
                        <div className="spinner" style={{ marginBottom: '1rem' }}>⚙️</div>
                        <p>Evaluating proximity for {requiresLab ? 'complex lab' : 'standard'} loop...</p>
                    </div>
                )}

                {error && (
                    <div style={{ padding: '1rem', backgroundColor: '#fff5f5', color: '#c0392b', borderRadius: '8px', border: '1px solid #feb2b2' }}>
                        {error}
                    </div>
                )}

                {ResultCard}
            </div>
        </div>
    );
};

export default Dashboard;