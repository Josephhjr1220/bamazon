var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function runBamazon() {

	var displayInventory = function() {

    	connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
             console.log('----------------------------------');
              console.log('ItemID: ' + res[i].item_id);
              console.log('Item: ' + res[i].product_name);
              console.log('Department: ' + res[i].department_name);
              console.log('Price: $' + res[i].price);
              console.log('Quantity: ' + res[i].stock_quantity);
            }
        	console.log("----------------------------------\n");
		});
	}

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			filter: Number
		}
	]).then(function(input) {

		connection.query('SELECT * FROM products WHERE ?', {item_id: input.item_id}, function(err, res) {
			if (err) throw err;

				if (input.quantity < res[0].stock_quantity) {

					// Update the inventory
					connection.query('UPDATE products SET stock_quantity = ' + (res[0].stock_quantity - input.quantity) + ' WHERE item_id = ' + input.item_id, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + res[0].price * input.quantity);
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log("Insufficient quantity!");
					console.log("\n---------------------------------------------------------------------\n");
				}
			})
		})
		displayInventory();
	}

runBamazon();