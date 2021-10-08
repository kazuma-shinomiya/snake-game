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
} from '../constants';
import { 
  initFields, 
  getFoodPosition, 
  isCollision, 
  isEatingMyself 
} from '../utils';

let timer = null;

const unsubscribe = () => {
  if (!timer) return;
  
  clearInterval(timer);
}

const useSnakeGame = () => {
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
      setTick((tick) => tick + 1);
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

  const stop = () => setStatus(GAME_STATUS.suspended);

  const start = () => setStatus(GAME_STATUS.playing);

  const reload = () => {
    const interval = DIFFICULTY[difficulty - 1];
    timer = setInterval(() => {
      setTick(tick => tick + 1);
    }, interval);
    setStatus(GAME_STATUS.init);
    setBody([initialPosition]);
    setDirection(DIRECTION.up);
    setFields(initFields(35, initialPosition));
  }

  const updateDirection = useCallback((newDirection) => {
    if (status !== GAME_STATUS.playing) return direction;
    if (OPPOSITE_DIRECTION[direction] === newDirection) return;

    setDirection(newDirection);
  }, [direction, status])

  const updateDifficulty = useCallback((difficulty) => {
    if (status !== GAME_STATUS.init) return;
    if (difficulty < 1 || difficulty > difficulty.length) return;

    setDifficulty(difficulty);
  }, [status, difficulty])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDirection = DIRECTION_KEYCODE_MAP[e.keyCode];
      console.log(e.keyCode);
      if (!newDirection) return;

      updateDirection(newDirection);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [updateDirection])

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

  return {
    body,
    difficulty,
    fields,
    status,
    start,
    stop,
    reload,
    updateDirection,
    updateDifficulty,
  }
}
export default useSnakeGame;