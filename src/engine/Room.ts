import { QuizbowlList } from "./QuizbowlList";

export class Room {
  private letter: string;
  private numberString: string;
  readonly symbol: symbol;

  constructor(letter: string, numberString: string) {
    this.letter = letter;
    this.numberString = numberString;
    this.symbol = Symbol();
  }

  toString(): string {
    return `${this.letter} (${this.numberString})`;
  }
}

export class RoomList extends QuizbowlList<Room> {}
