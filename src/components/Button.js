const Button = ({ status, onStop, onStart, onRestart }) => {
  return (
    <div className="button">
      { status === "gameOver" && <button className="btn btn-gameover" onClick={onRestart}>gameOver</button> }
      { status === "init" && <button className="btn btn-init" onClick={onStart}>start</button> }
      { status === "suspended" && <button className="btn btn-suspended" onClick={onStart}>start</button> }
      { status === "playing" && <button className="btn btn-playing" onClick={onStop}>stop</button> }
    </div>
  )
}
export default Button;