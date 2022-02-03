function match(user1, user2) {
    var total = user1.languages.length + user1.skills.length;
    langScore = 0;
    skillScore = 0;
    // console.log(user2)
    for (let language of user2.languages) {
        if (user1.languages.includes(language)) langScore++;
    }
    for (let skill of user2.skills) {
        if (user1.skills.includes(skill)) skillScore++;
    }
    let res = (langScore + skillScore) / total
    return res
}

module.exports.match = match