const {connectToDatabase} = require('../config/database');
class IndexController {
    constructor(){
        this.initDB();
    }
    async initDB() {
       
            this.db = await connectToDatabase();
            console.log('Database connection established successfully.');
    }
    async getItems(req, res) {
        try {
            const [rows] = await this.connection.execute('SELECT * FROM items');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async createItem(req, res) {
        const{id,name,description,price} = req.body;
        console.log('Creating item:', {id, name, description, price});
        try {
            await this.db.query('INSERT INTO items (id, name, description, price) VALUES (?, ?, ?, ?)', [id, name, description, price]);
        }catch (error) {
            console.error('Error creating item:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.josn({ message: 'Item created successfully' });
    }
}
module.exports = new IndexController();
