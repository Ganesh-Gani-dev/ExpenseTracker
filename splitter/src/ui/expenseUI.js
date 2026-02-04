import { DOMHelpers } from "./DOMHelper";
import { showSuccessToast } from "../utils/toastUtil";
import { showErrorToast } from "../utils/toastUtil";

export class ExpenseUI {
  constructor(userService, expenseService) {
    this.userService = userService;
    this.expenseService = expenseService;

    this.initializeElements();
    this.bindEvents();
    this.initializeSelectBox();
  }
  initializeElements() {
    this.elements = {
      addUserForm: DOMHelpers.getElementById("addUserForm"),
      userInput: DOMHelpers.getElementById("userInput"),
      expenseUserInput: DOMHelpers.getElementById("expenseUserInput"),
      addExpenseForm: DOMHelpers.getElementById("addExpenseForm"),
      expenseAmountInput: DOMHelpers.getElementById("expenseAmountInput"),
      expenseReasonInput: DOMHelpers.getElementById("expenseReasonInput"),
      paymentList: DOMHelpers.getElementById("payment-list"),
      simplifyBtn: DOMHelpers.getElementById("simplifyBtn"),
       resultArea: DOMHelpers.getElementById("resultArea"),
            paymentList: DOMHelpers.getElementById("payment-list"),
    };
  }

  initializeSelectBox() {
    const defaultOption = DOMHelpers.createOption("Select User", "");
    this.elements.expenseUserInput.add(defaultOption);
  }

  bindEvents() {
    this.elements.addUserForm.addEventListener("submit", (e) => {
      this.handleAddUser(e);
    });

    this.elements.addExpenseForm.addEventListener("submit", (e) => {
      this.handleAddExpense(e);
    });
    this.elements.simplifyBtn.addEventListener("click", () => {
      this.handleSimplify();
    });
  }

  handleAddUser(e) {
    e.preventDefault();

    try {
      const name = this.elements.userInput.value.trim();
      if (!name) {
        throw new Error("User name is mandatory");
      }
      const user = this.userService.addUser(name);
      this.addUserToSelect(user.name);

      this.elements.addUserForm.reset();
      showSuccessToast(`User ${user.name} got added!`);
      console.log(`User ${user.name} got added!`);
    } catch (error) {
      console.log(error);
      showErrorToast("Error Adding the user", error);
    }
  }

  addUserToSelect(userName) {
    const option = DOMHelpers.createOption(userName, userName);
    this.elements.expenseUserInput.add(option);
  }

  async handleAddExpense(e) {
    e.preventDefault();

    try {
      const paidBy = this.elements.expenseUserInput.value.trim();
      const amount = this.elements.expenseAmountInput.valueAsNumber;
      const description = this.elements.expenseReasonInput.value.trim();

      if (!paidBy) {
        showErrorToast("Please select a user");
      }

      if (!amount || amount <= 0) {
        showErrorToast("Please enter an amount greater than zero");
      }

      const expense = this.expenseService.addExpense(
        paidBy,
        amount,
        description,
      );
      this.renderExpense(expense);

      // Reset form
      this.elements.expenseAmountInput.value = "";
      this.elements.expenseReasonInput.value = "";

      showSuccessToast(`Expense added by ${paidBy}`);
      console.log(`Expense added by ${paidBy}:`, expense);
    } catch (error) {
      showErrorToast(error.message);
      console.error("Error adding expense:", error);
    }
  }

  renderExpense(expense) {
    const text =
      expense.description !== "No description"
        ? `${expense.paidBy} paid ₹${expense.amount} for ${expense.description}`
        : `${expense.paidBy} paid ₹${expense.amount}`;

    const listItem = DOMHelpers.createListItem(text, "expense-item");
    this.elements.paymentList.appendChild(listItem);
  }
  handleSimplify() {
    try {
      const results = this.expenseService.simplifyExpenses();
      this.displayResults(results);
    } catch(error) {
      showErrorToast(error.message);
      console.error("Error adding expense:", error);
    }
  }
   displayResults(results) {
        DOMHelpers.clearElement(this.elements.resultArea);

        if (results.length === 0) {
            const noResultsItem = DOMHelpers.createListItem(
                "All expenses are settled!",
                "no-results"
            );
            this.elements.resultArea.appendChild(noResultsItem);
            return;
        }

        DOMHelpers.appendFragment(this.elements.resultArea, results, (result) =>
            DOMHelpers.createListItem(result, "settlement-item")
        );
    }
}
