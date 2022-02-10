require('dotenv').config();
const { Client, Intents} = require('discord.js');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.DIRECT_MESSAGES
] });

client.on("ready", () => {
    console.log("ONLINE");
    client.user.setActivity(`who asked.`, {
        type: "LISTENING",
    });
});

function who_asked_short(message) {
    const user = message.author;

    const responses = [
        `${user}, who asked?`,
        `I'm sorry ${user}, I don't remember asking`,
        `Did you hear that? ${user}? Me neither.`,
        `The search continues to find out who asked, ${user}`,
        `${user}, did I ask?`,
    ];

    let ans = Math.floor(Math.random() * responses.length);
    message.channel.send(responses[ans]);
}

function who_asked_long(message) {
    const user = message.author;

    const responses = [
        `${user} Pardon me, I will be right back.`,
        `I'm going to go look for someone who asked ${user}`,
        `Wait a second...`,
        `Fun fact of the day.`,
        `${user} I have a question for you.`,
    ];

    const responses2 = [
        `Nope, still can't find who asked.`,
        `Can't find 'em.`,
        `False alarm, no one asked ${user}`,
        `No one asked. ${user}`,
        `Uh never mind.`,
    ];

    let ans = Math.floor(Math.random() * responses.length);

    message.channel.send(responses[ans]);

    setTimeout(() => {
        message.channel.send(responses2[ans]);
    }, 5000);
}

// Create an event listener for messages
client.on("messageCreate", async (message) => {
    if (message.channel.type === "dm") return;

    if (message.author.id == 129300871015038976 /* Tanner's ID */) {
        if (Math.floor(Math.random() * 101) <= 8) who_asked_short(message);
        else who_asked_long(message);
    }
});

client.login(process.env.TOKEN);
