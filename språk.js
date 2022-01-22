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
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Språkröret is online");
});

var gifSamling = {
  aaa: "A spooky skeleton",
  asg: "Big bro rolls around",
  cdd: "Cool dog checks it out",
  cia: "BaaaaaaanEE?",
  cil: "Bane ;P",
  cmm: "Prince Charming is not having it",
  cpr: "Cute panda rolls",
  fih: "Arkosh fanboy gathering",
  fuu: "Big bro is not pleased",
  jdk: "We just don't know",
  mam: "Hot mama!",
  ooh: "*Jaw Drops* Awooga! / Hummina Hummina Bazooing!",
  sry: "Oh shit",
};

client.on("messageCreate", async (meddelande) => {
  //=> är en funktion
  const channel = client.channels.cache.get(meddelande.channel.id);
  let dravel = meddelande.content.toLocaleLowerCase();

  if (!meddelande.author.bot) {
    if (dravel.slice(1, 4) in gifSamling) {
      console.log("Vi hittade grejen därine");
      gif(meddelande, dravel, channel);
    } else if (dravel === "oh my, what are the codes for these gifs?") {
      let gifManuel = new String();
      for (gifBeskrivning in gifSamling) {
        console.log(gifBeskrivning + gifSamling[gifBeskrivning]);
        gifManuel +=
          "\n" +
          ":" +
          gifBeskrivning +
          ":" +
          " = " +
          gifSamling[gifBeskrivning];
      }

      meddelande.reply(gifManuel);
    }
    console.log("vi hittade inte den här grejen");
  }
});

// Login to Discord with your client's token this should always go last I guess?
client.login(token);
