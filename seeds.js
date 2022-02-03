const User = require("./models/user")
const mongoose = require("mongoose")
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/myProject"
mongoose.connect(dbURL).then(() => console.log('Database connected'))

let langs = ["go", "python", "c#", "c", "c++",
    "ruby", "unity", "java", "javascript", "html",
    "css", "typescript", "sql", "mongo", "r", "swift",
    "php", "matlab", "perl", "rust"]
let skills = ["oop", "game development", "data structures",
    "algorithms", "web development", "front end development", "back end development",
    "ai", "machine learning", "web scraping", "neural networking", "design", "debugging",
    "object oriented programming", "databases", "modules", "libraries"
]

async function seed() {
    await User.remove({})
    let images = [
        "https://external-preview.redd.it/SXsP-8CWkB8CyCGud-teBSZitE7DHZozcVXfgPa8dbw.jpg?auto=webp&s=c4fe3f67e77a13af3225ddf6bbdadfcf82a526b5",
        "https://lh6.googleusercontent.com/-isSvEckufoc/AAAAAAAAAAI/AAAAAAAAATA/dafM86vHlJU/photo.jpg?sz=256",
        "https://media.shakingthehabitual.com/file/icons/source-coder.png",
        "https://cdn2.iconfinder.com/data/icons/coding-7/100/mobile-developer-4-coding-developer-programmer-coder-software-laptop-mobile-phone-app-female-128.png",
        "https://think2xit.com/wp-content/uploads/2021/03/developer-icons-9-3.png",
        "https://ubisoft-avatars.akamaized.net/0455e9b0-5161-4ded-bba0-da74b98a63f9/default_256_256.png",
        "https://media-exp1.licdn.com/dms/image/C5622AQHIy4j_qUZhDA/feedshare-shrink_2048_1536/0/1635874094995?e=1645056000&v=beta&t=n-I4GXiRS_uTFnrgqK3vcCkF2oBvD5nRt5wTbpLO2xI",
        "https://i.stack.imgur.com/Bd5kK.jpg?s=256&g=1",
        "https://www.sololearn.com/Icons/Avatars/3231658.jpg",
        "https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly91c2VyLWltYWdlcy5wb2RjaGFzZXIuY29tL2MwNTE5YjQ3N2FhYjU0NWNjMDcyZTdhYTgwZDg0MTc4ZjA2MDQ4NTE4ZmY4ZGUyMDM1MzYzZTAwNzEwYzZhMWQucG5n/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
        "https://pbs.twimg.com/profile_images/1369479175065702401/kEIQWA97_400x400.png",
        "https://up.quizlet.com/1s8ob0-9wBzX-256s.png",
        "https://b.thumbs.redditmedia.com/ol2fKplbuYfUnsVtZi34DEcFvybUdroNC9dnW1h7_7o.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcRVctzGQTGbmNao-YGT9d_23wvgd6NzZFxw&usqp=CAU",
        "https://super-static-assets.s3.amazonaws.com/c72855d1-e3ce-4d0a-81c8-eccf864b9434/images/b231cb2f-4200-4218-ba94-e2bc3a757672.png"
    ]
    for (let i = 0; i < 30; i++) {
        let langSize = Math.floor(Math.random() * 8)+2;
        let skillSize = Math.floor(Math.random() * 8)+2;
        let userLangs = []
        for (let i = 0; i < langSize; i++) userLangs.push(getLang(userLangs))
        let userSkills = []
        let email = `user_${i + 1}@fakemail.com`
        let image = images[Math.floor(Math.random() * images.length)]
        for (let i = 0; i < skillSize; i++) userSkills.push(getSkill(userSkills))
        let newUser = new User({
            username: `user_${i + 1}`, languages: userLangs, skills: userSkills,
            description: `I am user_${i + 1} and I was created to test this website!`, email,
            image
        })
        await User.register(newUser, "1234567890987654323456789")
    }
}

function getLang(userLangs) {
    let res = langs[Math.floor(Math.random() * langs.length)];
    while (userLangs.includes(res)) {
        res = langs[Math.floor(Math.random() * langs.length)];
    }
    return res;
}
function getSkill(userSkills) {
    let res = skills[Math.floor(Math.random() * skills.length)];
    while (userSkills.includes(res)) {
        res = skills[Math.floor(Math.random() * skills.length)];
    }
    return res;
}
seed().then(() => console.log("done"))