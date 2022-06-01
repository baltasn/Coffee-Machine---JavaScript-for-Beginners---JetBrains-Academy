
let ingredientsWithAmountsAvailable = [
  {name:'water', quantity: 0, units: 'ml'},
  {name:'milk', quantity: 0, units: 'ml'},
  {name:'coffee beans', quantity: 0, units: 'g'}
]
let numberOfCupsAvailable = 0;
let cashAvailable = 0;

let beveragesWithIngredients = [
  {beverageName: 'espresso',
    ingredients:[
      {ingredientName:'water',ingredientQuantity: 250},
      {ingredientName:'coffee beans',ingredientQuantity: 16}
    ]
  },
  {beverageName: 'latte',
    ingredients:[
      {ingredientName:'water',ingredientQuantity: 350},
      {ingredientName:'milk',ingredientQuantity: 75},
      {ingredientName:'coffee beans',ingredientQuantity: 20}
    ]
  },
  {beverageName: 'cappuccino',
    ingredients:[
      {ingredientName:'water',ingredientQuantity: 200},
      {ingredientName:'milk',ingredientQuantity: 100},
      {ingredientName:'coffee beans',ingredientQuantity: 12}
    ]
  },
  {beverageName: 'double espresso',
    ingredients:[
      {ingredientName:'water',ingredientQuantity: 300},
      {ingredientName:'coffee beans',ingredientQuantity: 32}
    ]
  },
  {beverageName: 'americano',
    ingredients:[
      {ingredientName:'water',ingredientQuantity: 350},
      {ingredientName:'coffee beans',ingredientQuantity: 16}
    ]
  }
]
let pricesList = [
  {beverageName: 'espresso', price: 4},
  {beverageName: 'double espresso', price: 7},
  {beverageName: 'americano', price: 4},
  {beverageName: 'latte', price: 7},
  {beverageName: 'cappuccino', price: 6}
]

let machineRunning = true;

initializeMachine();
runMachine();


function runMachine() {
  do {
    takeFirstAction(promptForAndGetInput());
    console.log();
  } while (machineRunning);
}

function initializeMachine() {
  initializeIngredients();
  initializeCoffeeCups();
  initializeCash();
}

function initializeIngredients() {
  changeIngredientAmountByName('water', 400);
  changeIngredientAmountByName('milk', 540);
  changeIngredientAmountByName('coffee beans', 120);
}

function changeIngredientAmountByName(ingredientName, amountDifference) {
  let ingredient = ingredientsWithAmountsAvailable.find(findIngredient,ingredientName);
  ingredient.quantity = ingredient.quantity + amountDifference;
}
function findIngredient(ingredient) {
  return ingredient.name == this;
}

function initializeCoffeeCups() {
  numberOfCupsAvailable = 9;
}

function initializeCash() {
  cashAvailable = 550;
}

function printMachineState(){
  console.log('The coffee machine has:');
  printIngredientsAvailable();
  printCupsAvailable();
  printCashAvailable();
}

function printIngredientsAvailable() {
  ingredientsWithAmountsAvailable.forEach(printIngredientInfo);
}
function printIngredientInfo(ingredient) {
  console.log(ingredient.quantity + " " + ingredient.units + " of " + ingredient.name);
}
function printCupsAvailable(){
  console.log(`${numberOfCupsAvailable} disposable cups`);
}
function printCashAvailable(){
  console.log(`$${cashAvailable} of money`);
}

function promptForAndGetInput() {
  printActionsMenu();
  return getUserInput();
}

function printActionsMenu() {
  console.log(`Write action (buy, fill, take, remaining, exit):`);
}

function getUserInput(promptMessage) {
  const input = require('sync-input');
  return input(promptMessage);
}

function takeFirstAction(action) {
  switch (action) {
    case 'buy':
      promptForAndSellBeverage();
      break;
    case 'fill':
      refillMachine();
      break;
    case 'take':
      withdrawCash();
      break;
    case 'remaining':
      printMachineState();
      break;
    case 'exit':
      machineRunning = false;
      break;
    default:
      printWrongInputMessage();
      break;
  }
}

function promptForAndSellBeverage(){
  let coffeeOptionsRunning = true;
  do {
    printBeveragesMenu();
    coffeeOptionsRunning = getInputAndCheck();
  } while(coffeeOptionsRunning);
}

function printBeveragesMenu() {
  console.log(`What do you want to buy? ${createBeveragesMenu()}back - to main menu:`);
}

function createBeveragesMenu() {
  let numberedMenu = '';
  let i = 0;
  for (i; i <pricesList.length ; i++) {
    numberedMenu = numberedMenu + `${i+1} - ${pricesList[i].beverageName}, `;
  }
  return numberedMenu;
}

function getInputAndCheck() {
  let userInput = getUserInput('');
  let choice = parseInt(userInput);
  if (userInput === 'back') {
      return false;
  }
  else if (choice >= 1 && choice <= pricesList.length) {
    sellBeverage(choice);
    return false;
  }
  else {
    printWrongInputMessage();
    return true;
  }
}

function sellBeverage(choice) {
  let beverageName = pricesList[choice - 1].beverageName;
  let missingIngredients = findMissingIngredients(beverageName);
  if (missingIngredients.length > 0) {
    missingIngredients.forEach(missingIngredient => console.log(`Sorry, not enough ${missingIngredient}!`));
  } else {
    brewBeverage(beverageName);
    numberOfCupsAvailable --;
    cashAvailable += pricesList[choice - 1].price;
    console.log(`I have enough resources, making you a coffee!`);
  }
}

function brewBeverage(beverageName) {
  getIngredientAmountsByBeverageName(beverageName).forEach(deductIngredientQuantity);
}

function findMissingIngredients(beverageName) {
  let missingIngredientsNames = [];
  for (let i = 0; i < getIngredientAmountsByBeverageName(beverageName).length; i++) {
    let ingredientToBeUsed = getIngredientAmountsByBeverageName(beverageName)[i];
    let ingredientName = ingredientToBeUsed.ingredientName;
    let ingredientQuantityNeeded = ingredientToBeUsed.ingredientQuantity;
    let ingredientQuantityAvailable = ingredientsWithAmountsAvailable.find(findIngredient,ingredientName).quantity;
    if (ingredientQuantityNeeded > ingredientQuantityAvailable) {
      missingIngredientsNames.push(ingredientName);
    }
  }
  return missingIngredientsNames;
}

function deductIngredientQuantity(ingredient){
  changeIngredientAmountByName(ingredient.ingredientName, -ingredient.ingredientQuantity);
}

function getIngredientAmountsByBeverageName(beverageName) {
  let ingredientsAmounts = getBeverageByName(beverageName).ingredients;
  return ingredientsAmounts;
}

function getBeverageByName(beverageName) {
  return beveragesWithIngredients.find(findBeverage,beverageName);
}
function findBeverage(beverage) {
  return beverage.beverageName == this;
}

function refillMachine() {
  promptForAndRefillIngredients();
  promptForAndRefillCups();
}

function promptForAndRefillIngredients() {
  ingredientsWithAmountsAvailable.forEach(promptForAndRefillIngredient);
}

function promptForAndRefillIngredient(ingredient){
  let units = ingredient.units;
  console.log(`Write how many ${units === 'g' ? 'grams' : units } of ${ingredient.name} you want to add:`)
  changeIngredientAmountByName(ingredient.name, parseInt(getUserInput('')));
}

function promptForAndRefillCups() {
  console.log(`Write how many disposable coffee cups you want to add:`);
  numberOfCupsAvailable += parseInt(getUserInput(''));
}

function withdrawCash() {
  let cashWithdrawn = cashAvailable;
  cashAvailable = 0;
  console.log(`I gave you $${cashWithdrawn}`);
}

function printWrongInputMessage() {
  console.log(`Wrong input, please try again!`);
}

