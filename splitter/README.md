# Expense Splitter 🔧

A small, client-side **Expense Tracker / Splitter** that helps you add expenses and split amounts between users. Built with Vite and vanilla JavaScript—minimal, modular, and easy to extend.

---

## ✅ Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm start
```

3. Open the app at: `http://localhost:5173`

Build for production:

```bash
npm run build
npm run preview
```

---

## 🔧 Features

- Add and manage expenses
- Split or assign expenses between users
- Clean, modular code (models, services, UI helpers)

---

## 📁 Project Structure

- `index.html` — entry page
- `src/main.js` — app bootstrap
- `src/models/` — data models (`expense.js`, `user.js`)
- `src/services/` — business logic and storage (`expenseService.js`, `userService.js`)
- `src/ui/` — DOM helpers and UI components (`DOMHelper.js`, `expenseUI.js`)
- `src/utils/` — utilities (`toastUtil.js`)

---

## 💡 Contributing

Feel free to open issues or submit PRs. Keep changes small and focused with clear commit messages.

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
