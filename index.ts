#! /usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk';

interface IBankAccount {
  deposit: (amount: number) => {};
  withdraw: (amount: number) => {};
}

class BankAccount implements IBankAccount {
  accountBalance: number;

  constructor(accountBalance: number) {
    this.accountBalance = accountBalance;
  }

  withdraw(amount: number) {
    let statement: string = "Sorry! You have insufficient balance";
    if (amount < 0) {
      statement = "Enter the correct amount!";
    } else if (amount < this.accountBalance) {
      this.accountBalance -= amount;
      statement = `Transaction successful! New balance is $${this.accountBalance}`;
    } else {
      statement = "You don't have enough money to do this transaction";
    }
    return statement;
  }

  deposit(amount: number) {
    let statement: string = "Transaction Failed!";
    if (amount > 0) {
      this.accountBalance += amount;
      statement = `Amount credited successfully!\nYour new balance is $${this.accountBalance}`;
    } else if (amount > 100) {
      this.accountBalance -= 1;
      statement = `Amount credited successfully!\nYour new balance is $${this.accountBalance}`;
    }
    return statement;
  }
}

class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  accountNumber: number;
  bankAccount: BankAccount;
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    accountNumber: number,
    bankAccount: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.accountNumber = accountNumber;
    this.bankAccount = bankAccount;
  }

  customerInfo() {
    console.log(chalk.bold.green(`\nFirst Name: ${this.firstName}`));
    console.log(chalk.bold.green(`Last Name: ${this.lastName}`));
    console.log(chalk.bold.green(`Age: ${this.age}`));
    console.log(chalk.bold.green(`Gender: ${this.gender}`));
    console.log(chalk.bold.green(`Account Number: ${this.accountNumber}`));
    console.log(chalk.bold.green(`Account Balance: ${this.bankAccount.accountBalance}\n`));
    
  }
}

const customers: Customer[] = [
  new Customer(
    "John",
    "Doe",
    30,
    "Male",
    1001,
    new BankAccount(100)
  ),
  new Customer(
    "Jane",
    "Smith",
    25,
    "Female",
    1002,
    new BankAccount(300)
  ),
  new Customer(
    "Bob",
    "Johnson",
    35,
    "Male",
    1003,
    new BankAccount(250)
  ),
  new Customer(
    "Marrie",
    "Kristen",
    22,
    "Female",
    1004,
    new BankAccount(400)
  ),
  new Customer(
    "Miguel",
    "Lopez",
    28,
    "Male",
    1005,
    new BankAccount(500)
  ),
];

console.log(chalk.bold.italic.magenta("\n\t\tWELCOME TO OOP MY BANK"));
console.log(chalk.bold.italic.blue("\t========================================\n"));

console.log(chalk.bold.yellow.italic("Hint: Account number is between 1001 to 1005\n"));


let condition = true


  const askAccNo = await inquirer.prompt({
    name: "accNo",
    type: "number",
    message: "Please enter your account number:",
  });

  if(askAccNo.accNo < 1000 || askAccNo.accNo > 1005){
    console.log("Invalid account number!");
  }else {
    const customer = customers.find((customer) => customer.accountNumber === askAccNo.accNo);
    if (!customer) {
      console.log("Account not found!");
    } else {
      console.log(chalk.bold.italic.blue(`\nWelcome ${customer.firstName} ${customer.lastName}!\n`));

      do{
      const askAction = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Customer Details", "Check Balance", "Deposit", "Withdraw", "Exit"],
      });
   
      if(askAction.action === "Customer Details"){
        chalk.bold.blue(customer.customerInfo());
      }
        else if (askAction.action === "Check Balance") {
          console.log(chalk.bold.green(`Your current balance is ${customer.bankAccount.accountBalance}`));
        
        } else if (askAction.action === "Deposit") {
          const askDeposit = await inquirer.prompt({
            name: "deposit",
            type: "number",
            message: "Enter the amount to deposit:",
          });
      
          if (askDeposit.deposit < 0) {
            console.log("Invalid amount!");
          } else {
            console.log(chalk.bold.green(`\n${customer.bankAccount.deposit(askDeposit.deposit)}\n`));
          }
        } else if (askAction.action === "Withdraw") {
          const askWithdraw = await inquirer.prompt({
            name: "withdraw",
            type: "number",
            message: "Enter the amount to withdraw:",
          });
      
          if (askWithdraw.withdraw < 0) {
            console.log("Invalid amount!");
          } else {
            console.log(chalk.bold.green(`\n${customer.bankAccount.withdraw(askWithdraw.withdraw)}\n`));
          }
        } else if (askAction.action === "Exit") {
          console.log("Exiting...");
          condition = false
        } else {
          console.log("Invalid action selected.");
        }
        if (condition) {
                  const continuePrompt = await inquirer.prompt({
                    name: "continue",
                    type: "confirm",
                    message: "Would you like to perform another action?",
                    default: true,
                  });
                condition = continuePrompt.continue;
                if(continuePrompt.continue === false){
                  console.log(chalk.bold.green("\nExiting..."))
                  condition
                }else{
                  continue

                }
        }

    }while(condition)
    
    }
    }
  

