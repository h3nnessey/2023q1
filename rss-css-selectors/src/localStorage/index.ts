export interface GameState {
  current: number;
  completed: number[];
  helped: number[];
}

export const setLocalStorage = (gameState: GameState) => {
  localStorage.setItem('h3nnessey', JSON.stringify(gameState));
};

export const getLocalStorage = (): GameState => {
  const json = localStorage.getItem('h3nnessey');
  return json
    ? JSON.parse(json)
    : {
        current: 0,
        completed: [],
        helped: [],
      };
};
