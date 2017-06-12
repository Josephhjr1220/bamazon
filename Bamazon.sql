create database	Bamazon;

use Bamazon;

	create table products(
    
		item_id INT  AUTO_INCREMENT NOT NULL,
		product_name varchar (30) null,
		department_name varchar (30) not null,
		price decimal (10,2) not null,
        stock_quantity int (20) not null,
		primary key (item_id)
		);
        
        insert into products (product_name, department_name, price, stock_quantity)
			values ("Nintendo Switch", "Electronics", 380.00, 20), 
						("Ipad Pro", "Electronics", 799, 30),
						("Galaxy S8", "Electronics", 745.00, 30), 
						("Overwatch", "Video Games", 40, 50),
                        ("Destiny 2", "Video Games", 59.99, 100),
                        ("Call of Duty: Black Ops 3", "Video Games", 29.99, 100),
                        ("Logan", "Movies", 29.99, 80),
                        ("Rogue One", "Movies", 24.99, 60),
                        ("Deadpool", "Movies", 19.99, 60);
			
			select * from products;