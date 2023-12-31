import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.urlencoded({extended: false})); // to use json, convert request to json
app.use(express.json());

const database = {
    users: [
        {
            id:"123",
            name: "john",
            email: "john@gmail.com",
            password: "creams",
            entries: 0,
            joined: new Date()
        },
        {
            id:"125",
            name: "sall",
            email: "john@gmail.com",
            password: "cream",
            entries: 0,
            joined: new Date()
        },
        {
            id:"127",
            name: "mike",
            email: "mike@gmail.com",
            password: "cream",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.json(database.users);
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("success")
    } else {
        res.status(400).json("Error signing in");
    }
})


app.post("/register", (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
    });
    database.users.push({
        id: "126",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]);
})

app.get("/profile/:id", (req, res) => {
    const {id} = req.params; // url end
    let found = false;
    database.users.forEach(user => {
        if(user.id === id ) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(404).json("User not found");
    }
})

app.put("/image", (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id ) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })

    if (!found) {
        res.status(404).json("User not found");
    }
})

app.listen(3000, () => {
    console.log("good");
})