import PlantDetails from './PlantDetails'
import "./Modal/Modal.css";

const TestDetails = () => {
    return (
            <div className="modalWrapper" >
              <div className="modalContent">
                <PlantDetails plantID={1}/>
              </div>
            </div>
    )
}

export default TestDetails
