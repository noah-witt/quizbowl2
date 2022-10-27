import { Room } from "./Room";

const START_CHAR = "A";
function getLetter(index: number): string {
  return String.fromCharCode(START_CHAR.charCodeAt(0) + index);
}

export function roomFactory(names: string[]): Room[] {
  const result: Room[] = [];
  for (let i = 0; i < names.length; i++) {
    result.push(new Room(getLetter(i), names[i]));
  }
  return result;
}
