export interface IWordSearchPosition {
  row: number;
  col: number;
}

export interface IWordSearchBoard {
  board: string[][];
  settings: {
    size: number;
    uppercase: boolean;
    border: boolean;
    borderWidth: number;
    borderColor: string;
    words: string[];
  };
}
