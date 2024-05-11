import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://67832c4556ddad33b480aa04bffa3c66@o4507232819806208.ingest.us.sentry.io/4507232821116928",
  integrations: [
    Sentry.browserTracingIntegration(),

    Sentry.metrics.metricsAggregatorIntegration(),
    // Metrics Aggregator is a feature of Sentry that collects and aggregates performance metrics from your application. It helps you monitor and analyze the performance of your application by tracking metrics such as response times, throughput, and error rates.By adding this integration, Sentry will collect performance data alongside error data, providing a comprehensive view of your application's health and performance

    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect:React.useEffect,
      // This line integrate the React Router V6 with Browser Tracing integration for Sentry.React Router is a popular library for managing routing in React applications, and Browser Tracing is a feature of Sentry that allows you to trace and monitor the performance of routes in your application.The integration measures how fast pages load and how smoothly users move between pages.This helps you see if there are any problems occur when page changes that make your app slow
    }),

    Sentry.replayIntegration(
      {maskAllText: false,
      blockAllMedia: false,}
    ),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
