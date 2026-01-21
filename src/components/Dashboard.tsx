import React, { useState } from 'react';
import { findOptimalClinician } from '../utils/dispatchLogic';
import type { DispatchResult } from '../types';

/**
 * Dashboard Component
 * Manages the clinician dispatch UI and ensures logic only fires on user action.
 */
const Dashboard: React.FC = () => {
    // --- Form State ---
    const [address, setAddress] = useState('');
    const [requiresLab, setRequiresLab] = useState(false);

    // --- Results State ---
    const [result, setResult] = useState<DispatchResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // --- Handlers ---åƒ{}
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate to prevent empty submissions
        if (!address.trim()) return;

        // 1. Reset previous result and start loading state
        setResult(null);
        setIsCalculating(true);

        // 2. Wrap in a small timeout to allow UI to update and simulate processing
        setTimeout(() => {
            try {
                const optimal = findOptimalClinician(address, requiresLab);
                setResult(optimal);
            } catch (error) {
                console.error("Dispatch Calculation Error:", error);
            } finally {
                setIsCalculating(false);
            }
        }, 300); // 300ms is enough to provide visual feedback
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
            <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Clinician Dispatch</h1>
                <p style={{ color: '#666' }}>Minimize drive time for home visit assignments.</p>
            </header>

            {/* Input Section */}
            <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
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
                            placeholder="e.g. 4120 Garfield Ave, Minneapolis, MN"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                        <input
                            id="lab-toggle"
                            type="checkbox"
                            checked={requiresLab}
                            onChange={(e) => setRequiresLab(e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                        />
                        <label htmlFor="lab-toggle" style={{ fontWeight: '500', userSelect: 'none' }}>
                            Lab Drop-off Required
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isCalculating}
                        style={{
                            padding: '1rem',
                            backgroundColor: isCalculating ? '#a5c8ed' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: isCalculating ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {isCalculating ? 'Calculating Optimal Route...' : 'Find Optimal Clinician'}
                    </button>
                </form>
            </section>

            {/* Results Display  */}
            <div style={{ marginTop: '2.5rem', minHeight: '150px' }}>
                {isCalculating && (
                    <div style={{ textAlign: 'center', color: '#666' }}>
                        <p>Analyzing routes for {requiresLab ? 'Lab Visit' : 'Standard Visit'} loop...</p>
                    </div>
                )}

                {result && !isCalculating && (
                    <article style={{
                        padding: '1.5rem',
                        border: '2px solid #28a745',
                        borderRadius: '12px',
                        backgroundColor: '#f8fff9',
                        boxShadow: '0 4px 10px rgba(40, 167, 69, 0.1)'
                    }}>
                        <h2 style={{ marginTop: 0, color: '#218838', fontSize: '1.3rem' }}>Best Match Found</h2>
                        <div style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                            <p style={{ margin: '0.5rem 0' }}><strong>Clinician:</strong> {result.clinicianName}</p>
                            <p style={{ margin: '0.5rem 0' }}><strong>Estimated Round-Trip:</strong> {result.totalDistance} miles</p>
                        </div>
                        <footer style={{ fontSize: '0.85rem', color: '#666', borderTop: '1px solid #d4edda', paddingTop: '0.8rem' }}>
                            <strong>Loop Type:</strong> {requiresLab ? 'Home → Patient → Lab → Home' : 'Home → Patient → Home'}
                        </footer>
                    </article>
                )}
            </div>
        </div>
    );
};

export default Dashboard;