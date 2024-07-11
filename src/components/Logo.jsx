import React from 'react'
import logoImage from 'G:/React_Js/12MegaBlog/src/assets/images/imglogo.jpg'
function Logo({width = '100px'}) {
  return (
    <div>       <img
    src={logoImage}
    alt="Logo"
    style={{
      width,
      borderRadius: '50%', // For circular image
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '2px solid white',
      padding: '5px',
      backgroundColor: 'white', // Adds padding space around the image
      objectFit: 'cover' // Ensures the image covers the entire area
    }} /></div>
  )
}

export default Logo
