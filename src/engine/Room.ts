import { QuizbowlList } from "./QuizbowlList";

export class Room {
  private letter: string;
  private numberString: string;

  constructor(letter: string, numberString: string) {
    this.letter = letter;
    this.numberString = numberString;
  }

  toString(): string {
    return `${this.letter} (${this.numberString})`;
  }
}

export class RoomList extends QuizbowlList<Room> {}
