# Coffee Machine - JavaScript for Beginners - JetBrains Academy
 Coffee Machine is a graduate project for track JavaScript for Beginners. 
 
 Description

We can carry on and make things more interesting, can't we? Let's improve the program so it can do multiple actions, one after another. It must repeatedly ask users what they want to do. Users can input either buy, fill, or take, and then the program does the same thing it did in the previous step. However, if users want to turn off the coffee machine, they should type in exit. The program terminates after this command. Also, when users type in remaining, the program should output all coffee machine resources. This means that you shouldn't show the remaining stock levels at the beginning/end of the program.
Objectives

Write a program that continuously makes coffee for everyone until the shutdown command is provided. Introduce two new options: remaining and exit.

Do not forget that you can overstretch your supplies while making coffee. If the coffee machine doesn't have enough resources to make coffee, the program should output a message saying that it can't make it anymore and state what is missing.

And the last improvement to the program at this step — if users enter buy to buy a cup of coffee but change their mind afterward, allow them to input back to return to the main menu.

Set the following initial supplies: 400 ml of water, 540 ml of milk, 120 g of coffee beans, 9 disposable cups, $550.
Example

The greater-than symbol followed by a space (> ) represents the user input. Note that it's not part of the input.

Example 1: the program operations

Write action (buy, fill, take, remaining, exit):
> remaining

The coffee machine has:
400 ml of water
540 ml of milk
120 g of coffee beans
9 disposable cups
$550 of money

Write action (buy, fill, take, remaining, exit):
> buy

What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:
> 2
I have enough resources, making you a coffee!

Write action (buy, fill, take, remaining, exit):
> remaining

The coffee machine has:
50 ml of water
465 ml of milk
100 g of coffee beans
8 disposable cups
$557 of money

Write action (buy, fill, take, remaining, exit):
> buy

What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:
> 2
Sorry, not enough water!

Write action (buy, fill, take, remaining, exit):
> fill

Write how many ml of water do you want to add:
> 1000
Write how many ml of milk do you want to add:
> 0
Write how many grams of coffee beans do you want to add:
> 0
Write how many disposable cups of coffee do you want to add:
> 0

Write action (buy, fill, take, remaining, exit):
> remaining

The coffee machine has:
1050 ml of water
465 ml of milk
100 g of coffee beans
8 disposable cups
$557 of money

Write action (buy, fill, take, remaining, exit):
> buy

What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:
> 2
I have enough resources, making you a coffee!

Write action (buy, fill, take, remaining, exit):
> remaining

The coffee machine has:
700 ml of water
390 ml of milk
80 g of coffee beans
7  disposable cups
$564 of money

Write action (buy, fill, take, remaining, exit):
> take

I gave you $564

Write action (buy, fill, take, remaining, exit):
> remaining

The coffee machine has:
700 ml of water
390 ml of milk
80 g of coffee beans
7 disposable cups
$0 of money

Write action (buy, fill, take, remaining, exit):
> exit
