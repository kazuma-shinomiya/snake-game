import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DIRECTION } from "../constants";

const ManipulationPanel = ({ onChange }) => {
  const onUp = () => onChange(DIRECTION.up);
  const onRight = () => onChange(DIRECTION.right);
  const onLeft = () => onChange(DIRECTION.left);
  const onDown = () => onChange(DIRECTION.down);
  
  return (
    <div className="manipulation-panel">
      <button className="manipulation-btn btn btn-left" onClick={onLeft}>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </button>
      <div>
        <button className="manipulation-btn btn btn-up" onClick={onUp}>
          <FontAwesomeIcon icon={faArrowUp}/>
        </button>
        <button className="manipulation-btn btn btn-down" onClick={onDown}>
          <FontAwesomeIcon icon={faArrowDown}/>
        </button>
      </div>
      <button className="manipulation-btn btn btn-right" onClick={onRight}>
        <FontAwesomeIcon icon={faArrowRight}/>
      </button>
    </div>
  )
}
export default ManipulationPanel;