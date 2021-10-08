import { GAME_STATUS } from "../constants";

const Button = ({ status, onStop, onStart, onRestart }) => {
  return (
    <div className="button">
      { status === GAME_STATUS.gameOver && <button className="btn btn-gameover" onClick={onRestart}>gameOver</button> }
      { status === GAME_STATUS.init && <button className="btn btn-init" onClick={onStart}>start</button> }
      { status === GAME_STATUS.suspended && <button className="btn btn-suspended" onClick={onStart}>start</button> }
      { status === GAME_STATUS.playing && <button className="btn btn-playing" onClick={onStop}>stop</button> }
    </div>
  )
}
export default Button;