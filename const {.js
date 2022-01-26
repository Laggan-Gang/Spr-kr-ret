const {
  Client,
  Intents,
  Message,
  Channel,
  TextChannel,
  MessageAttachment,
} = require("discord.js");
const { token } = require("./config.json");
let väntarPåRoll = false;
// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, //ASVIKTIG!!!
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
  cur: "Hollywood superstar finds out a girl is over 18, but over 25",
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
client.on("messageCreate", async (meddelande) => {
  //=> är en funktion
  if (!meddelande.author.bot) {
    const chanel = client.channels.cache.get(meddelande.channel.id);
    let dravel = meddelande.content.toLocaleLowerCase();

    const smörja = meddelande.content.toLocaleLowerCase().split(" ");
    const KOMMANDO = smörja[0];

    if (dravel.slice(1, 4) in gifSamling) {
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
    if (meddelande.content == "tråd") {
      let i = 0;
      let dummyArray = [
        {
          namn: "hugo",
          preferences: ["1", "2", "3", "4", "5"],
          id: "207840759087497217",
          pick: "-1",
        },
        {
          namn: "joel",
          preferences: ["4", "5", "1", "2", "3"],
          id: "395189309688512512",
          pick: "-1",
        },
        {
          namn: "max",
          preferences: ["2", "1", "3", "4", "5"],
          id: "161956657402740736",
          pick: "-1",
        },
        {
          namn: "linus",
          preferences: ["4", "5", "3", "2", "1"],
          id: "151467562520150016",
          pick: "-1",
        },
        {
          namn: "victor",
          preferences: ["3", "4", "2", "5", "1"],
          id: "162288590192246784",
          pick: "-1",
        },
      ];
      const thread = await meddelande.channel.threads.create({
        name: "food-talk",
        autoArchiveDuration: 60,
        reason: "Needed a separate thread for food",
      });
      const tråden = meddelande.channel.threads.cache.find((x) => {
        return x.name === "food-talk";
      });
      if (tråden.joinable) await tråden.join();

      let trådMeddelande = await tråden.send(
        `Please wait for the bot to set up :)`
      );
      let modMeddelande = "";
      //GLÖM INTE TA MED INTENTS
      await trådMeddelande.react("1️⃣");
      await trådMeddelande.react("2️⃣");
      await trådMeddelande.react("3️⃣");
      await trådMeddelande.react("4️⃣");
      await trådMeddelande.react("5️⃣");
      await trådMeddelande.react("896031062864580648");
      trådMeddelande.edit("Please pick your role by reacting to this post.");
      let pingMeddelande = await tråden.send(
        `<${dummyArray[i].namn}, your turn to pick. Please react with your role of choice.`
      );

      const collector = trådMeddelande.createReactionCollector({
        filter: (_, user) => !user.bot,
        time: 300_000,
        max: 100,
      });
      console.log("Nu kommer vår samling", collector);
      let pickladeRoller = [];
      var emojiSiffror = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
      let fillBoys = [];
      let allaHarPickat = false;

      function fuckBuddy(reaktion, reiteraktion) {}

      collector.on("collect", async (reaction, user) => {
        let vanligPick = emojiSiffror.includes(reaction.emoji.name);
        if (allaHarPickat) {
          pingMeddelande.delete();

          console.log("Nu är det fill time! ");
          pingMeddelande = await tråden.send(
            `${fillBoys[i].namn} du är fill, your turn to pick. Please react above with your role of choice.`
          );
        } else if (vanligPick) {
          let pickÄrRedanPickad = pickladeRoller.includes(reaction.emoji.name);
          if (!pickÄrRedanPickad) {
            pickladeRoller.push(reaction.emoji.name);

            pingMeddelande.delete();

            modMeddelande += `${dummyArray[i].namn} has picked ${reaction.emoji.name}!\n`;
            await trådMeddelande.edit(modMeddelande);

            if (pickladeRoller.length <= 4) {
              pingMeddelande = await tråden.send(
                `${dummyArray[i].namn}, your turn to pick. Please react above with your role of choice.`
              );
            } else {
              collector.stop();
              fillFlag = false;
            }
          } else {
            let trängningsMeddelande = await tråden.send(
              `${dummyArray[i].namn} ${reaction.emoji.name} has already been picked, please pick another role!`
            );
            setTimeout(() => {
              trängningsMeddelande.delete();
            }, 5_000);
          }
        } else {
          fillFlag = true;
          pingMeddelande.delete();

          fillBoys.unshift(dummyArray[i]);
          console.log("DUmmy array post-splice: ", dummyArray);

          pingMeddelande = await tråden.send(
            `${dummyArray[i].namn}, your turn to pick. Please react above with your role of choice.`
          );
        }
        console.log("Nu ser dummy list ur såhär: ", dummyArray);
        console.log(
          "Nu är picking såhär fyld: " + pickladeRoller.length + "\n i är: " + i
        );
        i++;
        if (pickladeRoller.length + fillBoys.length == 5) {
          allaHarPickat = true;
          i = 0;

          if (fillBoys.length >= 1) {
            pingMeddelande = await tråden.send(
              `${fillBoys[i].namn}, your turn to pick. Please react above with your role of choice.`
            );
          }
        }
      });

      collector.on("end", (collected) => {
        console.log(`Collected ${collected}`);
      });
    }
  }
});

client.login(token);
