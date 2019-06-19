// Models
const User = require('./models/User');
const Log = require('./models/Log');

const checkForNewUsers = client => {
    // Create new Log
    let newLog = new Log({
        date: new Date(),
        text: 'Checking for new users...'
    });
    newLog.save().catch(err => console.log(err));
    client.guilds
        .find(x => x.name === 'Z S Ł Ł')
        .members.forEach(member => {
            User.findOne({ name: member.displayName }).then(user => {
                if (user) return;
                else {
                    if (member.user.bot && member.displayName !== 'ZadymkaBot 🔥') return;
                    let newUser = new User({
                        name: member.displayName,
                        joinedAt: member.joinedAt,
                        messages: 0
                    });
                    newUser
                        .save()
                        .then(newUser => {
                            // Create new Log
                            let newLog = new Log({
                                date: new Date(),
                                text: `User ${newUser.name} added...`
                            });
                            newLog.save().catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                }
            });
        });
};

const increaseMessagesCount = msg => {
    if (msg.member.user.bot && msg.member.displayName !== 'ZadymkaBot 🔥') return;
    User.findOne({ name: msg.member.displayName }).then(user => {
        User.findOneAndUpdate({ name: msg.member.displayName }, { messages: user.messages + 1 })
            .then(updatedUser => {
                if (updatedUser.name === 'ZadymkaBot 🔥') return;
                // Create new Log
                let newLog = new Log({
                    date: new Date(),
                    text: `User ${updatedUser.name} send message (db record edited)...`
                });
                newLog.save().catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
};

const addNewUser = member => {
    if (member.user.bot) return;
    // Create new Log
    let newLog = new Log({
        date: new Date(),
        text: `New user joined: ${member.displayName}, adding to db...`
    });
    newLog.save().catch(err => console.log(err));
    let newUser = new User({
        name: member.displayName,
        joinedAt: member.joinedAt,
        messages: 0
    });
    newUser
        .save()
        .then(() => {
            // Create new Log
            let newLog = new Log({
                date: new Date(),
                text: `User added...`
            });
            newLog.save().catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

const getMostActiveUsers = f => {
    User.find({ name: { $ne: 'ZadymkaBot 🔥' } })
        .sort({ messages: -1 })
        .limit(5)
        .then(users => {
            f(users);
        });
};

module.exports = { addNewUser, checkForNewUsers, increaseMessagesCount, getMostActiveUsers };
