export class ModifyStockCommand {
  constructor(
    public readonly id: string,
    public readonly amount: number,
  ) {}
}