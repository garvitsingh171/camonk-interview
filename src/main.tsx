// Entry point of the application
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Create a QueryClient instance
// This manages all the data fetching, caching, and synchronization
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // These are default settings for all queries
      refetchOnWindowFocus: false, // Don't refetch when user switches back to window
      retry: 1, // Retry failed requests once
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    },
  },
})

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap app with QueryClientProvider to use TanStack Query */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
