import { useAuth0 } from '@auth0/auth0-react'
import SatelliteVisualizer from './SatelliteVisualizer'

export default function App() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      ) : (
        <>
          <SatelliteVisualizer />
          <div style={{ textAlign: 'center', marginTop: '1rem'}}>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
