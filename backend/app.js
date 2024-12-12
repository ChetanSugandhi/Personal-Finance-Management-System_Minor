const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require("./models/Expense");
const Budget = require("./models/Budget");
const SavingsGoal = require('./models/SavingGoal');
const expenseRoutes = require('./routes/expenseRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/expenses', expenseRoutes);
app.use('/api/saving-goals', savingGoalRoutes);
app.use('/api/budgets', budgetRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.render('pages/index');
});


// About
app.get("/about", (req, res) => {
    res.render("pages/about");
});


//Contact
app.get("/contact", (req, res) => {
    res.render("pages/contact");
})


//Tax calculator
app.get("/tax", (req, res) => {
    res.render("pages/taxCalculator");
})



// Features
app.get('/features', (req, res) => {
    res.render('pages/features', {
        title: 'SpendSmart',
        homeText: 'Home',
        featuresText: 'Features',
        signUpText: 'Sign Up'
    });
});



app.get("/budgetHome", (req, res) => {
    res.render("pages/budgetHome/budgetHome");
})


// Define route for the expenses page
app.get('/expenses', (req, res) => {
    res.render('pages/expenses');
});


// POST route to save the expense
app.post('/addExpense', (req, res) => {
    const { name, amount, category, date, paymentMethod, notes } = req.body;

    const newExpense = new Expense({
        name,
        amount,
        category,
        date,
        paymentMethod,
        notes
    });

    newExpense.save()
        .then(() => {
            Expense.find()
                .then((expenses) => {
                    res.render('pages/showExpense', { newExpense: expenses });
                })
                .catch((err) => {
                    console.log('Error fetching expenses:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((err) => {
            console.log('Error saving expense:', err);
            res.status(500).send('Internal Server Error');
        });
});


app.get("/showExpense", (req, res) => {
    res.render("pages/showExpense");
})



// Define route for the budget page
app.get('/budget', (req, res) => {
    res.render('pages/budget');
});

app.post('/addBudget', (req, res) => {
    const { category, budgetAmount, period, priority, notes } = req.body;

    const newBudget = new Budget({
        category,
        budgetAmount,
        period,
        priority,
        notes,
    });

    newBudget.save()
        .then(() => {
            Budget.find()
                .then((budgets) => {
                    res.render('pages/showBudget', { newBudget: budgets });
                })
                .catch((err) => {
                    console.log('Error fetching budgets:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((err) => {
            console.log('Error saving budget:', err);
            res.status(500).send('Internal Server Error');
        });
});


// Define route for the saving goals page
app.get('/savings', (req, res) => {
    res.render('pages/savings');
});


// POST request to add a new savings goal
app.post('/addSavings', (req, res) => {
    const { goalName, targetAmount, currentSavings, deadline, notes } = req.body;

    const newGoal = new SavingsGoal({
        goalName,
        targetAmount,
        currentSavings,
        deadline,
        notes
    });

    newGoal.save()
        .then(() => {
            SavingsGoal.find()
                .then((goals) => {
                    res.render('pages/showSavingGoals', { newGoal: goals });
                })
                .catch((err) => {
                    console.log('Error fetching savings goals:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((err) => {
            console.log('Error saving savings goal:', err);
            res.status(500).send('Internal Server Error');
        });
});


// Login route
app.get('/login', (req, res) => {
    res.render('pages/login', {
        signupLink: '/signup',
        forgotPasswordLink: '/forgot-password'
    });
});



// Signup route
app.get('/signup', (req, res) => {
    res.render('pages/signup', {
        loginLink: '/login'
    });
});


// Forgot Password page
app.get('/forgot-password', (req, res) => {
    res.render('pages/forgotPassword', {
        loginLink: '/login'
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
