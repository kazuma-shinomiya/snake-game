import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import ManipulationPanel from './components/ManipulationPanel';
import { initFields, getFoodPosition } from './utils';
import { useCallback, useEffect, useState } from 'react';
import {
  initialPosition,
  initialValues,
  defaultDifficulty,
  DELTA,
  DIFFICULTY,
  DIRECTION,
  DIRECTION_KEYCODE_MAP,
  OPPOSITE_DIRECTION,
  GAME_STATUS,
} from './constants';

let timer = undefined;

const unsubscribe = () => {
  if (!timer) return;
  
  clearInterval(timer);
}

function App() {
  const [fields, setFields] = useState(initialValues);
  const [body, setBody] = useState([]);
  const [status, setStatus] = useState(GAME_STATUS.init);
  const [direction, setDirection] = useState(DIRECTION.up);
  const [difficulty, setDifficulty] = useState(defaultDifficulty);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setBody([initialPosition]);
    const interval = DIFFICULTY[difficulty - 1];
    timer = setInterval(() => {
      setTick(tick => tick + 1);
    }, interval);
    return unsubscribe;
  }, [difficulty]);


  useEffect(() => {
    if (body.length === 0 || status !== GAME_STATUS.playing) return;

    const canContinue = handleMoving();
    if (!canContinue) {
      unsubscribe();
      setStatus(GAME_STATUS.gameOver);
    }
  }, [tick]);

  const onStop = () => setStatus(GAME_STATUS.suspended);

  const onStart = () => setStatus(GAME_STATUS.playing);

  const onRestart = () => {
    const interval = DIFFICULTY[difficulty - 1];
    timer = setInterval(() => {
      setTick(tick => tick + 1);
    }, interval);
    setStatus(GAME_STATUS.init);
    setBody([initialPosition]);
    setDirection(DIRECTION.up);
    setFields(initFields(35, initialPosition));
  }

  const onChangeDirection = useCallback((newDirection) => {
    if (status !== GAME_STATUS.playing) return direction;
    if (OPPOSITE_DIRECTION[direction] === newDirection) return;

    setDirection(newDirection);
  }, [direction, status])

  const onChangeDifficulty = useCallback((difficulty) => {
    if (status !== GAME_STATUS.init) return;
    if (difficulty < 1 || difficulty > difficulty.length) return;

    setDifficulty(difficulty);
  }, [status, difficulty])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDirection = DIRECTION_KEYCODE_MAP[e.keyCode];
      console.log(e.keyCode);
      if (!newDirection) return;

      onChangeDirection(newDirection);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onChangeDirection])

  const handleMoving = () => {
    const { x, y } = body[0];
    const delta = DELTA[direction];
    const newPosition = { 
      x: x + delta.x, 
      y: y + delta.y,
    };
    if (isCollision(fields.length, newPosition) || isEatingMyself(fields, newPosition)) {
      return false;
    }
    const newBody = [...body];
    if (fields[newPosition.y][newPosition.x] !== 'food') {
      const removingTrack = newBody.pop();
      fields[removingTrack.y][removingTrack.x] = '';
    } else {
      const food = getFoodPosition(fields.length, [...newBody, newPosition]);
      fields[food.y][food.x] = 'food';
    }
    fields[newPosition.y][newPosition.x] = 'snake';
    newBody.unshift(newPosition);
    setBody(newBody);
    setFields(fields);
    return true;
  }

  const isCollision = (fieldSize, position) => {
    if (position.y < 0 || position.x < 0) return true;
    if (position.y > fieldSize - 1 || position.x > fieldSize - 1) return true;

    return false;
  }

  const isEatingMyself = (fields, position) => {
    return fields[position.y][position.x] === 'snake';
  }

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation length={body.length} difficulty={difficulty} onChangeDifficulty={onChangeDifficulty} />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button 
          status={status}
          onStop={onStop} 
          onStart={onStart} 
          onRestart={onRestart}
        />
        <ManipulationPanel onChange={onChangeDirection}/>
      </footer>
    </div>
  );
}

export default App;
