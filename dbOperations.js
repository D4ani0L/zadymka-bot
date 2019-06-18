// User model
const User = require('./models/User');

const checkForNewUsers = (client) => {
  console.log("Checking for new users...");
  client.guilds.find(x => x.name === "Z S Ł Ł").members.forEach(member => {
    User.findOne({ name: member.displayName }).then(user => {
      if (user) return
      else {
        if (member.user.bot && member.displayName !== "ZadymkaBot 🔥") return
        let newUser = new User({
          name: member.displayName,
          joinedAt: member.joinedAt,
          messages: 0
        });
        newUser.save().then((newUser) => {
          console.log(`User ${newUser.name} added...`)
        }).catch(err => console.log(err));
      }
    });
  });
}

const increaseMessagesCount = (msg) => {
  if (msg.member.user.bot && msg.member.displayName !== "ZadymkaBot 🔥") return
  User.findOne({ name: msg.member.displayName }).then(user => {
    User.findOneAndUpdate({ name: msg.member.displayName }, { messages: user.messages + 1 })
      .then(updatedUser => {
        if (updatedUser.name === "ZadymkaBot 🔥") return
        console.log(`User ${updatedUser.name} send message (db record edited)...`)
      }).catch(err => console.log(err));
  })
}

const addNewUser = (member) => {
  if (member.user.bot) return
  console.log(`New user joined: ${member.displayName}, adding to db...`);
  let newUser = new User({
    name: member.displayName,
    joinedAt: member.joinedAt,
    messages: 0
  });
  newUser.save().then(() => {
    console.log("Użytkownik dodany...")
  }).catch(err => console.log(err));
}

const getMostActiveUsers = (f) => {
  User.find({ name: { $ne: "ZadymkaBot 🔥" } }).sort({ 'messages': -1 }).limit(5).then((users) => {
    f(users);
  })
}

module.exports = { addNewUser, checkForNewUsers, increaseMessagesCount, getMostActiveUsers };