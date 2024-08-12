export class AddProductCommand {
    constructor(
      public readonly name: string,
      public readonly description: string,
      public readonly price: number,
      public readonly stock: number,
    ) {}
  }