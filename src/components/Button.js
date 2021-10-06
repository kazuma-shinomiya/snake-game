const Button = ({ status, onStop, onStart, onRestart }) => {
  return (
    <div className="button">
      { status === "gameOver" && <button onClick={onRestart}>gameOver</button> }
      { status === "init" && <button onClick={onStart}>start</button> }
      { status === "suspended" && <button onClick={onStart}>start</button> }
      { status === "playing" && <button onClick={onStop}>stop</button> }
    </div>
  )
}
export default Button;