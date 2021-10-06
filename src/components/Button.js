const Button = ({ status, onStart, onRestart }) => {
  return (
    <div className="button">
      {
        status === "gameOver" ?
        <button onClick={onRestart}>gameOver</button>
        :
        <button onClick={onStart}>start</button>
      }
    </div>
  )
}
export default Button;