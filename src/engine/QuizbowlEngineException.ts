export class QuizbowlEngineException extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: any) {
    super(message);
    this.name = "QuizbowlEngineException";
  }
}
