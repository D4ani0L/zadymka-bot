let messages = [];
const time = 4000;

const checkForSpam = msg => {
    if (!msg.author.bot) {
        messages.push({ author: msg.member.displayName, time: Date.now() });
    }
    let newMessages = messages.filter(item => {
        return Date.now() - time < item.time;
    });
    messages = newMessages;
    let check = messages.filter(item => {
        return item.author === msg.member.displayName;
    });
    if (check.length > 3) {
        return true;
    } else {
        return false;
    }
};

module.exports = { checkForSpam };
