import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary>
      <div className="app-container">
        {children}
      </div>
    </ErrorBoundary>
  )
} 