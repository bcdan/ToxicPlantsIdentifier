
const Plant = ({plant,setShowModal,setPlantID}) => {
    const openModal = () => {
      setShowModal(prev => !prev);
      setPlantID(plant.ID);
    };
  

      return (
        <div className="plant">
                <li onClick={openModal}>
                {plant.Name}
                </li>
        </div>

    )
}

export default Plant
