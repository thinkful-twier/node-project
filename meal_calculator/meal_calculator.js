var diners = [];
var tax = 0.0;
var tip = 0;

//an array to store itemized bills per diner.
//populated by getTotal()
var bills = [];

//calculates the total BEFORE tip
//populates bills with a breakdwn of bill per person (minus tip)
var getTotal = function(){
    var total = 0;
    bills = [];
    
    diners.forEach(function(diner){
        var dinerBill = diner.getBill();
        var dinerTax = dinerBill * tax;
        
        bills.push({
            forWhom:diner.name,
            amount:dinerBill,
            tax:dinerTax
        });
        
        total += dinerBill + dinerTax;
    });
    return total;
}

//sets a new tax rate
var addTax = function(newTax){
    tax = newTax;
}

//sets a new tip rate
var addTip = function(newTip){
    tip = newTip;
}

//prints the total bill,
//along with an itemized bill per diner
var printBill = function(){
    //get an up to date total, and populate the itemized list
    var total = getTotal();
    
    //first, print the bill amount
    console.log('Bill: ' + total.toFixed(2));
    
    //then print the total tax (for the whole bill)
    console.log('Tax: '+ (total*tax).toFixed(2));
    
    //then calculate the tip, and print it
    var tipAmount = total * tip;
    var eachTip = tipAmount / diners.length;
    console.log('Tip: ' + tipAmount.toFixed(2));
    
    total += tipAmount;
    
    //print the final, total amount
    console.log('Total: ' + total.toFixed(2));
    
    //finally, print the itemized list per diner
    bills.forEach(function(bill){
       console.log(bill.forWhom + ' owes ' + 
            bill.amount.toFixed(2) + ' plus ' +
            bill.tax.toFixed(2) + ' tax plus ' + 
            eachTip.toFixed(2) + ' tip.'); 
    });
}

//adds a new diner, and returns it
var addDiner = function(name){
    var newDiner = new Diner(name || diners.length);
    diners.push(newDiner);
    return newDiner;
}

//an object to store dishes
var Dish = function(name, price){
    this.name = name;
    this.price = price;
}

//an object to store diners
var Diner = function(name){
    this.name = name;
    this.dishes = [];   
}

//adds a Dish to the diner and returns it
Diner.prototype.addDish = function(name, price){
    var newDish = new Dish(name, price);
    this.dishes.push(newDish);
    return newDish;
}

//calculates the sum of all this diner's dishes
//does not include tax
Diner.prototype.getBill = function(){
    var total = 0;
    this.dishes.forEach(function(dish){
        total += dish.price;
    });
    return total;    
}


//Simple test script
var joe = addDiner('Joe');
joe.addDish('Lamb Curry', 14.56);
var steve = addDiner('Steve');
steve.addDish('Garlic Naan', 0.40);
steve.addDish('Lamb Vindaloo', 12.36);
var sally = addDiner('Sally');
sally.addDish('Chicken Tikki Masalla', 10.50);

addTax(0.045);
addTip(0.20);
printBill();