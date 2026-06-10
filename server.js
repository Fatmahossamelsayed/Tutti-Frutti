const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let usersDB = []; 
let ordersDB = [];

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    const userExists = usersDB.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ status: 'error', message: 'This email is already registered! ❌' });
    }

    usersDB.push({ email, password });
    return res.json({ status: 'success', message: 'Account created successfully! 🍓' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const matchedUser = usersDB.find(user => user.email === email && user.password === password);
    if (!matchedUser) {
        return res.status(400).json({ status: 'error', message: 'No account found or incorrect password! ❌' });
    }

    return res.json({ status: 'success', message: 'Logged in successfully! 🍓', isLoggedIn: true });
});

app.post('/api/checkout', (req, res) => {
    const { name, address, phone, cart, total_price } = req.body;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ status: 'error', message: 'Your bag is empty! 🛍️' });
    }

    const newOrder = {
        orderId: ordersDB.length + 1,
        customerName: name,
        shippingAddress: address,
        customerPhone: phone,
        items: cart,
        totalAmount: total_price,
        date: new Date()
    };

    ordersDB.push(newOrder);
    
    return res.json({ status: 'success', message: 'Thank you! Your order has been stored and is being processed 🍓✨' });
});

app.listen(PORT, () => {
    console.log(`✨ Tutti Frutti Backend Server is running successfully on http://localhost:${PORT}`);
});