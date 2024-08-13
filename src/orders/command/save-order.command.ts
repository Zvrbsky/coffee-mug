export class SaveOrderCommand {
  constructor(
    public readonly products: string[],
    public readonly customerId: string,
  ) {}
}