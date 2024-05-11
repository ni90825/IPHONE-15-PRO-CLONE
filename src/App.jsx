// import { useState } from 'react'

import './App.css'
import Hero from './components/hero.jsx';
import Highlight from './components/highlight.jsx';
import Navbar from './components/navbar.jsx';
import Model from './components/model.jsx';

import * as Sentry from "@sentry/react"

function App() {
  
  return (
    <>
    
      {/* @apply in css use to give the multiple css style to particular classes  */}

      {/* @layer: inside this we define the utility class with styles i.e customizing style and use it as classes in html element */}

      {/* 
      @layer utilities {
  .flex-center {
    @apply flex items-center justify-center

    // @apply to give multiple css style to one defined classes

    // @layer is use to define classes with style.
  } 
  */}
<main className='bg-black'>
<Navbar></Navbar>
<Hero></Hero>
<Highlight></Highlight>
<Model></Model>
</main>
    </>
  )
}
// withProfiler() is a higher-order component (HOC) provided by Sentry that integrates with React applications to automatically measure and track performance data for components rendered within the given scope
// here scope is app
// this withProfile() specify area where we make check of sentry
export default Sentry.withProfiler(App)
