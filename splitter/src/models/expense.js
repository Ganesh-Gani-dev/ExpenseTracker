export class Expense {
  constructor(paidBy, amount, description = "No description") {
    if (!paidBy || typeof paidBy != "string") {
      console.warn("PaidBy must be a non empty string");
    }
    if (!amount || typeof amount != "number" || amount <= 0) {
      console.warn("Amount must be of a non-empty number");
    }
    this.paidBy = paidBy.trim();
    this.amount = amount;
    this.description = description;
    this.timestamp = new Date();
    this.id = this.generateId();
  }
  generateId() {
    return crypto.randomUUID();
  }
}
