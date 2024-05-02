// import { useState } from 'react'

import './App.css'
import Hero from './components/hero.jsx';
import Highlight from './components/highlight.jsx';
import Navbar from './components/navbar.jsx';
import Videocarousel from './components/videocarousel.jsx';

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
</main>
    </>
  )
}

export default App
