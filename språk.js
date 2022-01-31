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
  aah: "Maakep does this at work",
  asg: "Big bro rolls around",
  cdd: "Cool dog checks it out",
  cia: "BaaaaaaanEE?",
  cil: "Bane ;P",
  cmm: "Prince Charming is not having it",
  cpr: "Cute panda rolls",
  cur: "Hollywood superstar finds out a girl is over 18, but under 25",
  fih: "Arkosh fanboy gathering",
  fuu: "Big bro is not pleased",
  jdk: "We just don't know",
  mam: "Hot mama!",
  ooh: "*Jaw Drops* Awooga! / Hummina Hummina Bazooing!",
  sry: "Oh shit",
};

function goblinPosting(bild, namn, ord, kanal) {
  async function webbKrok() {
    try {
      let goblinPhoto = bild;
      var webhook = await kanal.createWebhook(namn);
      await webhook.send({
        content: ord,
        username: namn,
        avatarURL: goblinPhoto,
      });
      webhook.delete();
    } catch (whoops) {
      console.error("Här sket det sig: ", whoops);
    }
  }
  webbKrok();
}

let goblinSamling = {
  "!gob": ["kom ihåg att lägga till url här :)", "Secret ;)"],
};
let gobboGex = new RegExp(`^:(${Object.keys(gifSamling).join("|")}):`);
client.on("messageCreate", async (meddelande) => {
  //=> är en funktion
  if (!meddelande.author.bot) {
    const chanel = client.channels.cache.get(meddelande.channel.id);
    let dravel = meddelande.content.toLocaleLowerCase();

    const smörja = meddelande.content.toLocaleLowerCase().split(" ");
    const KOMMANDO = smörja[0];
    if (
      dravel.length <
        3 +
          Object.keys(gifSamling)
            .map((i) => i.length)
            .map(Math.max, 0) &&
      dravel.match(gobboGex)
    ) {
      gif(meddelande, dravel, chanel);
      setTimeout(() => {
        meddelande.delete().catch((error) => {
          if (error.code !== 10008) {
            console.error("Failed to delete the message: ", error);
          }
        });
      }, 1000);
    } else if (dravel === "oh my, what are the codes for these gifs?") {
      let gifManuel = new String();
      for (gifBeskrivning in gifSamling) {
        gifManuel +=
          "\n" +
          ":" +
          gifBeskrivning +
          ":" +
          " = " +
          gifSamling[gifBeskrivning];
      }

      meddelande.reply(gifManuel);
    } else if (KOMMANDO in goblinSamling) {
      meddelande.reply("It's not time yet");
      //// ASSUMING DIRECT CONTROL
      //goblinPosting(
      //  goblinSamling[KOMMANDO][0],
      //  goblinSamling[KOMMANDO][1],
      //  dravel.replace(KOMMANDO, ""),
      //  chanel
      //);
      //setTimeout(() => {
      //  meddelande.delete().catch((error) => {
      //    if (error.code !== 10008) {
      //      console.error("Failed to delete the message: ", error);
      //    }
      //  });
      //}, 1000);
    }
  }
});

// Login to Discord with your client's token this should always go last I guess?
client.login(token);
