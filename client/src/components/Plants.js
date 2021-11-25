import Plant from './Plant'
const Plants = ({plants,setShowModal,setPlantID}) => {
    return (
        <>
          {plants.map((plant)=>(
              <Plant 
              key={plant.ID} 
              plant={plant} 
              setShowModal={setShowModal}
              setPlantID={setPlantID}
               />
              ))}  
        </>
    )
}

export default Plants
