if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const MongoStore = require('connect-mongo')
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./models/user")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const cors = require('cors');
const flash = require("connect-flash")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { match } = require("./Tools")
const isImageURL = require('image-url-validator').default;

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/myProject"
mongoose.connect(dbURL).then(() => console.log('Database connected')).catch(e=>console.log(e))
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json({ success: false })
    }
    next()
}
const store = MongoStore.create({
    mongoUrl: dbURL,
    secret: "secret",
    touchAfter: 24*3600
})
app.listen(5000, () => console.log("listening on port 5000"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        store,
        secret: "ThisismysecretcodePleaseDOntHackMe",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, true);
});

app.use(flash())
app.get("/userdata", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

app.post("/create", async (req, res) => {
    var { email, description, languages, skills, image, username, password } = req.body;
    skills = skills.split(",").map(s => s.trim().toLowerCase()).filter(e => e.length !== 0)
    languages = languages.split(",").map(s => s.trim().toLowerCase()).filter(e => e.length !== 0)
    if (await User.findOne({ username })) return res.json({ success: false, errMessage: "Username already taken" })
    if (await User.findOne({ email })) return res.json({ success: false, errMessage: "Email already taken" })
    if (image.length) {
        const valid = await isImageURL(image)
        if (!valid) return res.json({ success: false, errMessage: "Image URL is invalid" })
    }
    else{
        image = "https://i0.wp.com/justmarkup.com/img/avatar-default.png"
    }
    const newUser = new User({ email, description, languages, skills, image, username })
    try {
        const registeredUser = await User.register(newUser, password)
    } catch {
        res.json({success:false, errMessage: "Something went wrong"})
    }
    res.json({ success: true })
})

app.get("/userdata/:id", async (req, res) => {
    const { id } = req.params
    var user;
    try {
        user = await User.findById(id)
    } catch (e) {
        user = { username: "" }
    }
    res.json(user)
})

app.post("/login", passport.authenticate('local', { failureFlash: true }), async (req, res) => {
    let { username } = req.body
    req.session.user = await User.findOne({ username })
    res.json({ success: true })
})

app.get("/test", isLoggedIn, (req, res) => {
    res.send("welcome")
})

app.get("/isLogged", isLoggedIn, (req, res) => {
    res.json({ success: true, user: req.session.user})
})

app.get("/matchdata", isLoggedIn, async (req, res) => {
    if (!req.session.user) return res.json({ success: false });
    let testUser = req.session.user;
    let allUsers = await User.find({})
    let matches = allUsers.sort((user1, user2) => match(testUser, user1) - match(testUser, user2)).reverse().map(u => { return { user: u, percentage: match(testUser, u) } });
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].user.username === req.session.user.username) matches.splice(i, 1);
        break;
    }
    return res.json({ success: true, currUser: req.session.user, matches })
})

app.get("/logout", (req, res) => {
    req.logout();
    req.session.user = null;
    return res.send("L")
})

app.post("/update", async (req,res) => {
    var { email, description, languages, skills, image, username, _id, password } = req.body;
    skills = skills.split(",").map(s => s.trim().toLowerCase()).filter(e => e.length !== 0)
    languages = languages.split(",").map(s => s.trim().toLowerCase()).filter(e => e.length !== 0)
    if (image.length) {
        const valid = await isImageURL(image)
        if (!valid) return res.json({ success: false, errMessage: "Username/Email already taken" })
    }
    else{
        image = "https://i0.wp.com/justmarkup.com/img/avatar-default.png"
    }
    try {
        await User.findByIdAndUpdate(_id, {username, email, password, languages, skills, description, image})
        return res.json({ success: true })
    } catch(e) {
        console.log(e)
        return res.json({success:false, errMessage: e.message})
    }
})