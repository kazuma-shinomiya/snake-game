import { initFields } from "../utils";

const fieldSize = 35;
export const initialPosition = { x: 17, y: 17 };
export const initialValues = initFields(fieldSize, initialPosition);
export const defaultDifficulty = 3;
export const DIFFICULTY = [1000, 500, 100, 50, 10];

export const GAME_STATUS = Object.freeze({
  init: 'init',
  playing: 'playing',
  suspended: 'suspended',
  gameOver: 'gameOver', 
})

export const DIRECTION = Object.freeze({
  up: 'up',
  right: 'right',
  left: 'left',
  down: 'down',
})

export const DIRECTION_KEYCODE_MAP = Object.freeze({
  37: DIRECTION.left,
  38: DIRECTION.up,
  39: DIRECTION.right,
  40: DIRECTION.down,
})

export const OPPOSITE_DIRECTION = Object.freeze({
  up: 'down',
  right: 'left',
  left: 'right',
  down: 'up',
})

export const DELTA = Object.freeze({
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
})
