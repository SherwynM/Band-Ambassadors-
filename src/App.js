import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Music from './components/Music';
import About from './components/About';
import Gigs from './components/Gigs';
import Gallery from './components/Gallery';
import Press from './components/Press';
import Contact from './components/Contact';
function App() {
  return (
    <div className="relative overflow-x-hidden">
     <Navbar />
     <Hero />
     <Music />
     <About/>
     <Gigs />
     <Press/>
     <Gallery/>
     <Contact/>
    </div>
  );
}

export default App;
