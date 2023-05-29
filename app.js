const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MongoAdapter = require("@bot-whatsapp/database/mongo");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AllMessagesSchema = new Schema({
  from: String,
  to: String,
  body: String,
});

const {
  MONGO_DB_URI,
  MONGO_DB_NAME,
  META_JWT_TOKEN,
  META_NUMBER_ID,
  META_VERIFY_TOKEN,
} = process.env;

const flowPrincipal = addKeyword([
  "hola",
  "ole",
  "alo",
  "Hola, quisiera hablar sobre un proyecto",
  "buenos",
  "buenas",
])
  .addAnswer("🙌 ¡Hola! ¡Gracias por tu interés en nuestros servicios!")
  .addAnswer([
    "Este bot esta siendo actualizado por lo que no estara disponible unos dias 😞",
    "pero no te preocupes, en breve se comunicara contigo un asesor 😉",
  ]);

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

  await mongoose.connect(`${MONGO_DB_URI}/messages`);
  const AllMessages = mongoose.model("AllMessages", AllMessagesSchema);

  adapterProvider.on("message", (ctx) => {
    console.log("=========");
    console.log(ctx);
    const newMessage = new AllMessages(ctx);
    newMessage.save();

    console.log("=========");
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
