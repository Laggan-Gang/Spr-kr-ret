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
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, //ASVIKTIG!!!
  ],
});

const maakepCall = require("./bajs.js");

//BELOW THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//ABOVE THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

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
    if (meddelande.content.startsWith("yarn")) {
      const väntaNuHurMångaGubbarÄrDet = meddelande.content.split(" ");
      const gubbLängdsKollare = väntaNuHurMångaGubbarÄrDet.slice(1);
      if (gubbLängdsKollare.length == 5) {
        let trådNamn = `The ${meddelande.member.displayName} party`;

        let i = 0;
        let dummyArray = await maakepCall.maakepCall(meddelande);
        const tråden = await meddelande.channel.threads.create({
          name: trådNamn,
          autoArchiveDuration: 60,
          reason: "Needed a separate thread for PISS",
        });
        //const tråden = meddelande.channel.threads.cache.find((x) => {
        //  return x.name === trådNamn;
        //});
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
        await trådMeddelande.react("935684531023925299");
        trådMeddelande.edit("Please pick your role by reacting to this post.");
        let pickladeRoller = [];
        var emojiSiffror = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
        let fillBoys = [];
        let aktivaNoobs = dummyArray;
        var äggKlockan;
        var pingMeddelande;

        pingMeddelande = await tråden.send(ROLLCALL(dummyArray));

        searchAndDestroy(dummyArray, 199);

        const collector = trådMeddelande.createReactionCollector({
          filter: (_, user) => !user.bot,
          time: 360_000,
          max: 100,
        });

        function ROLLCALL(noobs) {
          let whoYouGonnaCall = [];
          for (const noob of noobs) {
            whoYouGonnaCall.push(vadKallasDu(noob));
          }
          whoYouGonnaCall.join(" ");
          let returMeddelande = `${whoYouGonnaCall}, get ready to pick!`;
          return returMeddelande;
        }

        function vadKallasDu(noob) {
          if (noob.id) {
            console.log("Nooben i fråga har ett ID ", noob.id);
            return noob.id;
          } else {
            console.log("Nooben har inte ett id " + noob.namn);
            console.log(noob);
            noobenIFråga = kapitalisera(noob.namn);
            return kapitalisera(noob.namn);
          }
        }

        function hittaOchKollaPreferens(noobs) {
          //kolla om vår noob har en preferens, har den det så nice
          if (noobs[i].preferences) {
            let preferenser = noobs[i].preferences;
            let resultat = "fill";
            for (const preferens of preferenser) {
              if (rollKoll(emojiSiffror[preferens - 1]) == "vanlig") {
                //Vi använder roll-koll för att hitta vad som räknas som en "vanlig" pick och sen tjongar vi iväg den. Det är funky när vi översätter preferens till emojiSiffror eftersom
                //Den ena börjar på 0 och den andra på 1 men det verkar funka :)
                resultat = emojiSiffror[preferens - 1];
                break;
              }
            }
            return resultat;
          } //annars iterarar vi över emojis i emojisiffror och försöker kolla om någon av dem är en rimlig reaktion, sen kör vi iväg den
          else {
            let rimligReaktion;
            let slumpadeEmojis = shuffleArray(emojiSiffror);
            for (emoji in slumpadeEmojis) {
              if (rollKoll(slumpadeEmojis[emoji]) == "vanlig") {
                rimligReaktion = slumpadeEmojis[emoji];
                break;
              }
            }
            return rimligReaktion;
          }
        }

        async function autoPicker(reaktion, noobs) {
          console.log(
            "Nu kör vi automatiska versionen! Först kollar vi om vi fått fill"
          );
          if (reaktion == "fill") {
            console.log(reaktion + "är fill! Vi kör fillBoys");
            fillBoysNeedFilling(noobs, reaktion);
          } else {
            console.log(
              "Det är inte fill, så auto picker låter " +
                noobs[i] +
                " picka " +
                reaktion
            );
            await standardPick(reaktion, noobs);
            console.log("Sen hämta nästa noob!");
            await finskaFighten(noobs);
          }
        }

        function snooze(timer) {
          if (timer) {
            clearTimeout(timer);
            timer = 0;
          }
        }

        async function searchAndDestroy(noobs, row) {
          //destroy the last message
          try {
            await pingMeddelande.delete();
          } catch (error) {
            console.error("Failed to delete the message: ", error);
          }
          //seach for new guy
          try {
            let föredragen = hittaOchKollaPreferens(noobs);
            pingMeddelande = await tråden.send(
              `${vadKallasDu(
                aktivaNoobs[i]
              )}, your turn to pick. If you do not pick within 60 seconds you will be assigned ${föredragen}`
            );
            console.log(
              `${vadKallasDu(
                aktivaNoobs[i]
              )} kommer asignas ${föredragen} om 60 sekunder, ${row}`
            );
            //Vi sätter en äggklocka, men ser först till att vi avslutar den tidigare (om det finns någon)
            snooze(äggKlockan);
            äggKlockan = setTimeout(async function () {
              await autoPicker(föredragen, aktivaNoobs);
            }, 60_000);
          } catch (error) {
            console.error("Failed to send the message: ", error);
          }
        }

        function rollKoll(reaktion) {
          let vanligPick = emojiSiffror.includes(reaktion);
          if (vanligPick) {
            if (pickladeRoller.includes(reaktion)) {
              return "ogiltig";
            } else {
              return "vanlig";
            }
          } else {
            return "fill";
          }
        }

        async function standardPick(reaktion, noobs) {
          let riktigReact;
          console.log("Kolla om vår reaktion har ett namn ");
          if (reaktion.emoji) {
            console.log("'Den har ett namn!", reaktion.emoji.name);
            riktigReact = reaktion.emoji.name;
          } else {
            console.log("Den har inte ett namn!", reaktion);
            riktigReact = reaktion;
          }
          if (rollKoll(riktigReact) == "vanlig") {
            pickladeRoller.push(riktigReact);
            console.log("Picklade roller just nu är: ", pickladeRoller);
          }
          modMeddelande += `${kapitalisera(
            noobs[i].namn
          )} has picked ${riktigReact}!\n`;
          try {
            await trådMeddelande.edit(modMeddelande);
          } catch (error) {
            console.error("Failed to edit the message: ", error);
          }
          i++;
        }
        function modFull() {
          let modRader = modMeddelande.split("\n");
          if (modRader.length >= 6) {
            return true;
          } else {
            return false;
          }
        }
        async function dublettTillrättavisaren(noobs, reaction) {
          let trängningsMeddelande = await tråden.send(
            `${kapitalisera(noobs[i].namn)} ${
              reaction.emoji.name
            } has already been picked, please pick another role!`
          );
          setTimeout(() => {
            trängningsMeddelande.delete();
          }, 5_000);
        }

        function kapitalisera(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        async function skojareTillrättavisaren(noobs) {
          try {
            let skojareMeddelande = await tråden.send(
              `${kapitalisera(
                noobs[i].namn
              )} du kan inte välja fill när du är last pick >:(`
            );
            setTimeout(() => {
              skojareMeddelande.delete();
            }, 5_000);
          } catch (error) {
            console.error(error);
          }
        }

        async function finskaFighten(noobs) {
          snooze(äggKlockan);
          if (!modFull()) {
            console.log(
              "Alla noobs har inte valt roll eller fill, vi behöver fler"
            );
            await searchAndDestroy(noobs, 340);
          } else {
            console.log(
              "Alla har pickat roll eller fill, nu ska vi kolla om vi behöver byta array"
            );
            if (fillBoys.length > 0) {
              console.log(
                "Vi har boys i fill boys, vi switchar aktiv array, återställer i och kallar på nästa boy"
              );
              if (pickladeRoller.length === 5) {
                console.log("Vi har alla roller pickade, avslutar...");
                snooze(äggKlockan);
                collector.stop();
              } else {
                if (aktivaNoobs == dummyArray) {
                  console.log(
                    "Aktiva noobs har inte blivit fillBoys ännu, så vi resettar i"
                  );
                  i = 0;
                }
                aktivaNoobs = fillBoys;
                console.log(fillBoys[i]);
                await searchAndDestroy(aktivaNoobs, 361);
              }
            } else {
              console.log(
                "Fillboys är tom, vi behöver inte byta och avslutar..."
              );
              snooze(äggKlockan);
              collector.stop();
            }
          }
        }

        async function fillBoysNeedFilling(noobs, reaktion) {
          let modRader = modMeddelande.split("\n");
          if (modRader.length >= 5) {
            console.log(
              "Nu är modrader för lång, nu får man inte fill och nu kommer mobbningen"
            );
            await skojareTillrättavisaren(noobs);
          } else {
            //Vi fyller fillBoys med boys looking to fill. Sen hämtar vi nästa person som ska rakas
            console.log("Någon har valt fill, så vi sätter hen i fillboys");
            fillBoys.unshift(dummyArray[i]);
            await standardPick(reaktion, noobs);
            await searchAndDestroy(noobs, 419);
          }
        }

        collector.on("collect", async (reaction, user) => {
          console.log(
            "Vi har fått en react och ska nu utvärdera om den är vanlig, dublett eller fill"
          );
          let kolladReaktion = rollKoll(reaction.emoji.name);
          switch (true) {
            case kolladReaktion == "vanlig":
              console.log(
                "Picken är vanlig, så vi kör standardPick. Efter det här utvärderar vi om vi behöver fler noobs eller inte."
              );
              //om det är en standard pick
              await standardPick(reaction, aktivaNoobs);
              //Avsluta det hela genom att kalla nya noobs, men bara om vi behöver fler noobs (dvs om modFull inte är full)
              await finskaFighten(aktivaNoobs);
              break;

            case kolladReaktion == "ogiltig":
              //Ogiltig roll (mobba!)
              console.log("Någon har gjort funny business, så vi mobbar");
              await dublettTillrättavisaren(aktivaNoobs, reaction);
              break;

            case kolladReaktion == "fill":
              fillBoysNeedFilling(aktivaNoobs, reaction);
              break;
          }
        });

        collector.on("end", (collected) => {
          console.log("NU ÄR VI FÖRMODLIGEN KLARA");
          //Stäng av klockan och plocka bort pingmeddelande om det finns
          snooze(äggKlockan);
          if (pingMeddelande) {
            try {
              pingMeddelande.delete();
            } catch (error) {
              console.error(error);
            }
          }
          //Formatera om översta posten
          let modRader = modMeddelande.split("\n");
          let finsktMeddelande = "";
          function aOchO(sträng) {
            console.log(sträng);
            let nySträng = sträng.replace("!", "");
            let aOchO = nySträng.split(" ");
            return `${aOchO[0]} ${aOchO.pop()}`;
          }
          for (rad of modRader) {
            if (
              rad.includes(emojiSiffror[0]) ||
              rad.includes(emojiSiffror[1]) ||
              rad.includes(emojiSiffror[2]) ||
              rad.includes(emojiSiffror[3]) ||
              rad.includes(emojiSiffror[4])
            ) {
              finsktMeddelande += `${aOchO(rad)} `;
              console.log("Den här raden tjongar vi in i aOchO ", rad);
            }
          }
          console.log(finsktMeddelande);
          try {
            pingMeddelande = tråden.send(
              `Picking is complete!\n${finsktMeddelande} Gl hf :) `
            );
          } catch (error) {
            console.error("Failed to send the message: ", error);
          }
        });
      } else {
        meddelande.reply("Wrong amount of dudes, dude!");
      }
    }
  }
});

// Login to Discord with your client's token this should always go last I guess?
client.login(token);
