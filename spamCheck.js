let messages = [];

const checkForSpam = msg => {
    if (!msg.author.bot) {
        messages.push({ author: msg.member.displayName, time: Date.now() });
    }
    let newMessages = messages.filter(item => {
        return Date.now() - 4000 < item.time;
    });
    messages = newMessages;
    let check = messages.filter(item => {
        return item.author === msg.member.displayName;
    });
    console.log('Check: ' + check.length);
    if (check.length > 3) {
        msg.reply('nie spamuj zadymiarzu!');
        return true;
    } else {
        return false;
    }
};

module.exports = { checkForSpam };
