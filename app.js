const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MongoAdapter = require("@bot-whatsapp/database/mongo");
const dotenv = require("dotenv");

dotenv.config();

const {
  MONGO_DB_URI,
  MONGO_DB_NAME,
  META_JWT_TOKEN,
  META_NUMBER_ID,
  META_VERIFY_TOKEN,
} = process.env;

const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

const flowDocs = addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowDiscord = addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowPrincipal = addKeyword(["hola", "ole", "alo"])
  .addAnswer(
    "🙌 ¡Hola! ¡Gracias por tu interés en nuestros servicios! Estoy aquí para ayudarte. ¿En qué puedo asistirte?"
  )
  .addAnswer(
    [
      "te comparto los siguientes links de interes sobre el proyecto",
      "👉 ** para ver la documentación",
      "👉 *gracias*  para ver la lista de videos",
      "👉 *discord* unirte al discord",
    ],
    null,
    null,
    [flowDocs, flowGracias, flowTuto, flowDiscord]
  );

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });

  const adapterFlow = createFlow([flowPrincipal]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: META_JWT_TOKEN,
    numberId: META_NUMBER_ID,
    verifyToken: META_VERIFY_TOKEN,
    version: "v16.0",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
