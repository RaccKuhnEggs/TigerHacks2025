import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar.jsx';
import SatelliteVisualizer from './SatelliteVisualizer';

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {isAuthenticated ? (
          <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Navbar />
            <SatelliteVisualizer />
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Navbar />
            <p>Please log in to access the Satellite Visualizer</p>
          </div>
        )}
      </div>
    </div>
  );
}
