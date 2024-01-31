const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const SECRET = 'Umesh'; // This should be in an environment variable in a real application
const SECRET1 = 'Ola';
// Define mongoose schemas

const userSchema = new mongoose.Schema({
    username: String,
    password: String
        // purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
const arraySchema = new mongoose.Schema({
    title: String,
    state: Boolean,
    link: String,
});
const treeSchema = new mongoose.Schema({
    title: String,
    state: Boolean,
    link: String,
});
const graphSchema = new mongoose.Schema({
    title: String,
    state: Boolean,
    link: String,
});
const linklistSchema = new mongoose.Schema({
    title: String,
    state: Boolean,
    link: String,
});
const advanceSchema = new mongoose.Schema({
    title: String,
    state: Boolean,
    link: String,
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Array = mongoose.model('Array', arraySchema);
const Tree = mongoose.model('Tree', treeSchema);
const Graph = mongoose.model('Graph', graphSchema);
const LinkList = mongoose.model('LinkList', linklistSchema);
const Adv = mongoose.model('Advance', advanceSchema);



const admin_auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
const user_auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET1, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


// mongoose.connect('mongodb+srv://umeshola07:qNcsvOcbctqmMMRr@cluster07.pwmrrnn.mongodb.net/DSA', { useNewUrlParser: true, useUnifiedTopology: true, });

mongoose.connect('mongodb+srv://umeshola07:qNcsvOcbctqmMMRr@cluster07.pwmrrnn.mongodb.net/DSA');


app.post('/admin/signup', async(req, res) => {

    const { username, password } = req.body; // the above code is same as this code but we use async in this and await
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '2hr' });
        res.json({ message: 'Admin created', token });
    }
});

app.get('/admin/me', admin_auth, async(req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" })
        return
    }
    res.json({
        username: admin.username
    })
});



// total question

app.get("/admin/array/total", admin_auth, async(req, res) => {
    const numberOfDocuments = await Array.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/admin/ll/total", admin_auth, async(req, res) => {
    const numberOfDocuments = await LinkList.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/admin/tree/total", admin_auth, async(req, res) => {
    const numberOfDocuments = await Tree.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/admin/graph/total", admin_auth, async(req, res) => {
    const numberOfDocuments = await Graph.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/admin/adv/total", admin_auth, async(req, res) => {
    const numberOfDocuments = await Adv.countDocuments();
    res.status(201).json({ numberOfDocuments })
})



// adding

app.post('/admin/add/array', admin_auth, async(req, res) => {
    const question = new Array(req.body);
    await question.save();
    res.json({ message: 'Question in added ', questionId: question.id });
});

app.post('/admin/add/tree', admin_auth, async(req, res) => {
    const question = new Tree(req.body);
    await question.save();
    res.json({ message: 'Question in added ', questionId: question.id });
});
app.post('/admin/add/graph', admin_auth, async(req, res) => {
    const question = new Graph(req.body);
    await question.save();
    res.json({ message: 'Question in added ', questionId: question.id });
});
app.post('/admin/add/ll', admin_auth, async(req, res) => {
    const question = new LinkList(req.body);
    await question.save();
    res.json({ message: 'Question in added ', questionId: question.id });
});
app.post('/admin/add/adv', admin_auth, async(req, res) => {
    const question = new Adv(req.body);
    await question.save();
    res.json({ message: 'Question in added ', questionId: question.id });
});





// array 

app.get('/admin/array', admin_auth, async(req, res) => {
    const array = await Array.find({});
    res.json({ array });
});
app.get('/admin/tree', admin_auth, async(req, res) => {
    const tree = await Tree.find({});
    res.json({ tree });
});
app.get('/admin/graph', admin_auth, async(req, res) => {
    const graph = await Graph.find({});
    res.json({ graph });
});
app.get('/admin/ll', admin_auth, async(req, res) => {
    const ll = await LinkList.find({});
    res.json({ ll });
});
app.get('/admin/adv', admin_auth, async(req, res) => {
    const adv = await Adv.find({});
    res.json({ adv });
});




// User routes

app.post('/users/signup', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET1, { expiresIn: '1h' });
        // const token = get_auth1(newUser);
        res.json({ message: 'User created successfully', token });
    }
});

app.get('/users/me', user_auth, async(req, res) => {
    const admin = await User.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" })
        return
    }
    res.json({
        username: admin.username
    })
});



app.get('/users/array', user_auth, async(req, res) => {
    const array = await Array.find({});
    res.json({ array });
})
app.get('/users/tree', user_auth, async(req, res) => {
    const array = await Tree.find({});
    res.json({ array });
})
app.get('/users/graph', user_auth, async(req, res) => {
    const array = await Graph.find({});
    res.json({ array });
})
app.get('/users/ll', user_auth, async(req, res) => {
    const array = await LinkList.find({});
    res.json({ array });
})
app.get('/users/adv', user_auth, async(req, res) => {
    const array = await Adv.find({});
    res.json({ array });
})




app.get("/user/array/total", user_auth, async(req, res) => {
    const numberOfDocuments = await Array.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/user/ll/total", user_auth, async(req, res) => {
    const numberOfDocuments = await LinkList.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/user/tree/total", user_auth, async(req, res) => {
    const numberOfDocuments = await Tree.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/user/graph/total", user_auth, async(req, res) => {
    const numberOfDocuments = await Graph.countDocuments();
    res.status(201).json({ numberOfDocuments })
})
app.get("/user/adv/total", user_auth, async(req, res) => {
        const numberOfDocuments = await Adv.countDocuments();
        res.status(201).json({ numberOfDocuments })
    })
    //count done



app.get('/user/done/array', user_auth, async(req, res) => {
    try {
        const numberOfDoneQuestions = await Array.countDocuments({ state: true });
        res.json({ numberOfDoneQuestions });
    } catch (error) {
        console.error('Error counting done questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.get('/user/done/ll', user_auth, async(req, res) => {
    try {
        const numberOfDoneQuestions = await LinkList.countDocuments({ state: true });
        res.json({ numberOfDoneQuestions });
    } catch (error) {
        console.error('Error counting done questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.get('/user/done/graph', user_auth, async(req, res) => {
    try {
        const numberOfDoneQuestions = await Graph.countDocuments({ state: true });
        res.json({ numberOfDoneQuestions });
    } catch (error) {
        console.error('Error counting done questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.get('/user/done/adv', user_auth, async(req, res) => {
    try {
        const numberOfDoneQuestions = await Adv.countDocuments({ state: true });
        res.json({ numberOfDoneQuestions });
    } catch (error) {
        console.error('Error counting done questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.get('/user/done/tree', user_auth, async(req, res) => {
    try {
        const numberOfDoneQuestions = await Tree.countDocuments({ state: true });
        res.json({ numberOfDoneQuestions });
    } catch (error) {
        console.error('Error counting done questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// mark done
app.put('/users/array/:id', user_auth, async(req, res) => {
    try {
        const question = await Array.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.state = !question.state;
        const updatedQuestion = await question.save();
        res.json({ message: 'Question marked done' });
        // const array = await Array.find({});
        // res.json({ array });
    } catch (error) {
        console.error('Error marking question as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/users/tree/:id', user_auth, async(req, res) => {
    try {
        const question = await Tree.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.state = !question.state;
        const updatedQuestion = await question.save();
        res.json({ message: 'Question marked done' });
    } catch (error) {
        console.error('Error marking question as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/users/graph/:id', user_auth, async(req, res) => {
    try {
        const question = await Graph.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.state = !question.state;
        const updatedQuestion = await question.save();
        res.json({ message: 'Question marked done' });
    } catch (error) {
        console.error('Error marking question as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/users/ll/:id', user_auth, async(req, res) => {
    try {
        const question = await LinkList.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.state = !question.state;
        const updatedQuestion = await question.save();
        res.json({ message: 'Question marked done' });
    } catch (error) {
        console.error('Error marking question as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/users/adv/:id', user_auth, async(req, res) => {
    try {
        const question = await Adv.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.state = !question.state;
        const updatedQuestion = await question.save();
        res.json({ message: 'Question marked done' });
    } catch (error) {
        console.error('Error marking question as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));