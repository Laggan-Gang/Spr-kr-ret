const {
  Client,
  Intents,
  Message,
  Channel,
  TextChannel,
  MessageAttachment,
} = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

function gif(meddelande, dravel, channel) {
  let filNamn = dravel.slice(1, 4);
  let jamesCameron =
    "https://cdn.discordapp.com/avatars/" +
    meddelande.author.id +
    "/" +
    meddelande.author.avatar;
  async function webbKrok() {
    try {
      var webhook = await channel.createWebhook(meddelande.member.displayName, {
        avatar: jamesCameron,
      });

      await webhook.send({
        files: [filNamn + ".gif"],
        username: meddelande.member.displayName,
        avatarURL: jamesCameron,
      });
      webhook.delete();
    } catch (whoops) {
      console.error("Här sket det sig: ", whoops);
    }
  }
  webbKrok();
  meddelande.delete();
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Språkröret is online");
});

client.on("messageCreate", async (meddelande) => {
  //=> är en funktion
  const channel = client.channels.cache.get(meddelande.channel.id);
  let dravel = meddelande.content.toLocaleLowerCase();

  if (!meddelande.author.bot) {
    if (dravel == ":cmm:") {
      gif(meddelande, dravel, channel);
    }
  }
});

// Login to Discord with your client's token this should always go last I guess?
client.login(token);
