const {
  Client,
  Intents,
  Message,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageEmbed,
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
const gubbSamling = {
  abb: "Abby Slump",
  big: "Big Chief",
  dal: "Dale Worldwide",
  nov: "Nova Jackson",
  gob: "Goblin-Goblin Noré",
};

const gifSamling = {
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

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Språkröret is online");
});

let gobboGex = new RegExp(`^:(${Object.keys(gifSamling).join("|")}):`);
client.on("messageCreate", async (meddelande) => {
  //=> är en funktion
  if (!meddelande.author.bot) {
    const chanel = client.channels.cache.get(meddelande.channel.id);
    let dravel = meddelande.content.toLocaleLowerCase();
    const smörja = meddelande.content.toLocaleLowerCase().split(" ");
    const KOMMANDO = smörja[0];
    if (
      //  dravel.length <
      //    3 +
      //      Object.keys(gifSamling)
      //        .map((i) => i.length)
      //        .map(Math.max, 0) &&
      //  dravel.match(gobboGex)
      dravel.length == 5 &&
      dravel.startsWith(":") &&
      dravel.endsWith(":") &&
      dravel.slice(1, 4) in gifSamling
    ) {
      gif(meddelande, dravel, chanel);
      setTimeout(() => {
        meddelande.delete().catch((error) => {
          if (error.code !== 10008) {
            console.error("Failed to delete the message: ", error);
          }
        });
      }, 1000);
    } else if (
      meddelande.member.roles.cache.some((r) => r.name === "Game Boy") &&
      chanel.id === "933306428142280724"
    ) {
      switch (true) {
        case KOMMANDO in gubbSamling:
          console.log("Nu är vi inne i switch true");
          await embedMaker(KOMMANDO, meddelande);
          break;

        case KOMMANDO === "nar":
          await sockPuppet(meddelande);
          break;

        default:
          break;
      }
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
    }
  }
});

// Login to Discord with your client's token this should always go last I guess?
client.login(token);

async function embedMaker(char, meddelande) {
  meddelande.delete().catch((error) => {
    if (error.code !== 10008) {
      console.error("Failed to delete the message: ", error);
    }
  });
  text = meddelande.content.slice(4);
  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(gubbSamling[char])
    .setDescription(text)
    .setThumbnail(`https://laggan.online/${char}.png`);

  const larpMessage = await meddelande.channel.send({
    embeds: [exampleEmbed],
  });
}
async function sockPuppet(meddelande) {
  text = meddelande.content.slice(4);
  meddelande.delete().catch((error) => {
    if (error.code !== 10008) {
      console.error("Failed to delete the message: ", error);
    }
  });
  meddelande.channel.send(text);
}

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
