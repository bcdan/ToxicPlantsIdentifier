import React from 'react'
import Plant from './Plant'
const Plants = ({plants}) => {
    return (
        <>
          {plants.map((plant)=>(
              <Plant 
              key={plant.ID} 
              plant={plant} 
               />
              ))}  
        </>
    )
}

export default Plants
