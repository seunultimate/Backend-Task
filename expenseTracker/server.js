const express = require("express");
const expenseTracker = express();
const PORT = 3300;
expenseTracker.use = express.json()

const data = [
    {Id: '1', amount: 100000, type: 'income', category: 'salary', date: '2025-05-01', Note: 'may salary' },
    {Id: '2', amount: 25000, type: 'expense', category: 'food', date: '2025-05-06', Note: 'monthly food expenses' },
    {Id: '3', amount: 10000, type: 'expense', category: 'transportation', date: '2026-05-01 - 2025-05-30', Note: 'june salary' },
]

expenseTracker.post('/transactions', (req, res) =>{
    const { amount, type, category, date, Note } = req.body;
    if (!amount || !type || !category || !date || !Note) {
        return res.status(400).json({
             success: false, 
             message: 'All fields are required' });
    }

const newTransaction = { id: data.length + 1,
    amount, type, category, date, Note }; 
    data.push(newTransaction);
    res.status(201).json({  
        success: true, 
        message: 'Transaction created successfully', 
        transaction: newTransaction });
});


// Get all transactions
expenseTracker.get('/transactions', (req, res) =>{
    res.status(200).json({
        success: true, 
        count: data.length,
        transactions: data,
        message: 'transactions listed'
    })
})

//get transaction by id
expenseTracker.get('/transactions/:id', (req, res) => {
    const {id} = req.params;
    const transaction = data.find(
        (transaction) => transaction.id === id);
   
   if (!transaction) {
    return res.status(404).json({
        success: false,
        message: 'no transaction found with the id'
    })
   }

    res.status(200).json({
        success: true,
        transaction,
        message: 'transaction found'
    });
});

//put transaction by id
expenseTracker.put('/transactions/:id', (req, res) => {
    const {id} = req.params;
    const transaction = data.find(
        (transaction) => transaction.id === id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'no transaction found with the id'
            })
        }

        const { amount, type, category, date, Note } = req.body;
        if (amount !== undefined) transaction.amount = amount;
        if (type !== undefined) transaction.type = type;
        if (category !== undefined) transaction.category = category;
        if (date !== undefined) transaction.date = date;
        if (Note !== undefined) transaction.Note = Note;

        return res.status(200).json({
            success: true,
            transaction,
            message: 'transaction updated successfully'
        })
})

//delete transaction by id
expenseTracker.delete('/transactions/:id', (req, res) => {
    const {id} = req.params;
    const transactionIndex = data.findIndex(
        (transaction) => transaction.id === id);

        if (transactionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'no transaction found with the id'
            })
        }
        
        const deletedTransaction = data[transactionIndex];
        data.splice(transactionIndex, 2);
        return res.status(200).json({
            success: true,
            transaction: deletedTransaction,
            message: 'transaction deleted successfully'
        })
})


expenseTracker.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = expenseTracker;