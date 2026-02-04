import { ExpenseUI } from "./ui/expenseUI";
import {UserService} from "./services/userService"
import {ExpenseService} from "./services/expenseService"

class ExpenseApp {
   constructor ()
   {
    this.userService = new UserService();
    this.expenseService = new ExpenseService(this.userService);
    this.ui = null;
   } 

   init()
   {
    try{
        this.ui = new ExpenseUI(this.userService,this.expenseService);
        console.log("Splitter App initialized successfully")
    }
    catch(error){
     console.log("Error initializing the App!");
     
    }
   }
}

let expenseApp;

document.addEventListener("DOMContentLoaded",()=>{
    expenseApp = new ExpenseApp();
    expenseApp.init();
})