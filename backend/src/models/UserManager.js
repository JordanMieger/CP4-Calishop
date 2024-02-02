const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (id, firstname, lastname, password, email) values (?, ?, ?, ?, ?)`,
      [user.id, user.firstname, user.lastname, user.password, user.email]
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

  async checkEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const rows = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
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

  async update(user) {
    if(!user.id) {
        throw new Error("User ID is required");
    }

    // Execute the SQL UPDATE query to modify an existing user
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, password = ?, email = ?, adress = ? WHERE id = ?`,
      [user.firstname, user.lastname, user.password, user.email, user.adress, user.id]
    );
    
    // Return the number of affected rows
    if (result.affectedRows === 0) {
      throw new Error(`User with ID ${user.id} was not found`);
    } return result;
  };

  async updateAdress(user) {
    if(!user.id) {
        throw new Error("User ID is required");
    }

    // Execute the SQL UPDATE query to modify an existing users adress
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET adress = ? WHERE id = ?`,
      [user.adress, user.id]
    );
    
    // Return the number of affected rows
    if (result.affectedRows === 0) {
      throw new Error(`User with ID ${user.id} was not found`);
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
      throw new Error(`User with ID ${id} was not found`);
    } return result;
  }

}

module.exports = UserManager;
