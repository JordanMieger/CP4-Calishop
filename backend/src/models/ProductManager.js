const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "products" });
  }

  // The C of CRUD - Create operation

  async create(product) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (id, name, image, price) values (?, ?, ?, ?)`,
      [product.id, product.name, product.image, product.price]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(product) {
    if(!product.id) {
        throw new Error("Product ID is required");
    }

    // Execute the SQL UPDATE query to modify an existing user
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ?, price = ? WHERE id = ?`,
      [product.name, product.image, product.price, product.id]
    );
    
    // Return the number of affected rows
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID ${product.id} was not found`);
    } return result;
  };

  async updatePrice(product) {
    if(!product.id) {
        throw new Error("Product ID is required");
    }

    // Execute the SQL UPDATE query to modify an existing users adress
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET price = ? WHERE id = ?`,
      [product.price, product.id]
    );
    
    // Return the number of affected rows
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID ${product.id} was not found`);
    } return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async destroy(id) {
    // Execute the SQL DELETE query to remove the user
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the number of affected rows
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID ${id} was not found`);
    } return result;
  }

}

module.exports = ProductManager;
