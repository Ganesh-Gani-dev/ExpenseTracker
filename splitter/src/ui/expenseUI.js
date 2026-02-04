import {DOMHelpers} from './DOMHelper';


export class ExpenseUI{
    constructor(userService,expenseService)
    {
        this.userService = userService;
        this.expenseService = expenseService;

        this.initializeElements();
        this.bindEvents();
        //this.initializeSelectBox();
    }
    initializeElements()
    {
        this.elements = {
            addUserForm: DOMHelpers.getElementById("addUserForm"),
            userInput: DOMHelpers.getElementById("userInput")
        }
    }




    bindEvents(){
        this.elements.addUserForm.addEventListener("submit",(e)=>{
            this.handleAddUser(e);
        })
    }

    handleAddUser(e){
        e.preventDefault();

        try {
            const name = this.elements.userInput.value.trim();
            if(!name)
            {
                throw new Error ("User name is mandatory")
            }
            const user = this.userService.addUser(name);

            this.elements.addUserForm.reset();
            console.log(`User ${user.name} got added!`)

        }
        catch(error)
        {
          console.error("Error Adding the user",error);
        }
    }
}