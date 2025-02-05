import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <Component {...pageProps} />
      </div>
    </ErrorBoundary>
  )
}

export default MyApp 