import { Expense } from "../models/expense";
import {showSuccessToast} from "../utils/toastUtil";
import {showErrorToast} from "../utils/toastUtil"

export class ExpenseService
 {
    constructor(userService) {
        this.expenses = [];
        this.userService = userService;
    }

    addExpense(paidBy, amount, description) {
        if (!this.userService.hasUser(paidBy)) {
            throw new Error('User does not exist');
        }

        const expense = new Expense(paidBy, amount, description);
        this.expenses.push(expense);
        return expense;
    }

    getAllExpenses() {
        return [...this.expenses];
    }

    getExpensesByUser(userName) {
        return this.expenses.filter(expense => expense.paidBy === userName);
    }

    clear() {
        this.expenses = [];
    }

    simplifyExpense()
    {
        
    }
}
