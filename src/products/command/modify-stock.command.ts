export class ModifyStockCommand {
  constructor(
    public readonly products: {
      id: string,
      amount: number,
    }[]
  ) {}
}