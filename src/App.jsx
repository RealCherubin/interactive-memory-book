import React from 'react'
import Book from './components/Book'
import VinylPlayer from './components/VinylPlayer'
import CustomCursor from './components/CustomCursor'
import './index.css'

function App() {
  return (
    <>
      <CustomCursor />
      <VinylPlayer />
      <div className="ambient-light"></div>
      <Book />
    </>
  )
}

export default App
