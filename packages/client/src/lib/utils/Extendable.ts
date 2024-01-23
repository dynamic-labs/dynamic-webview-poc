export class Extendable<C> {
  constructor(private readonly core: C) {}

  extend<T, R = this & T>(extension: (client: this, core: C) => R): R {
    return extension(this, this.core);
  }
}
