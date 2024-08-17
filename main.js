const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const sqlite3 = require("sqlite3");

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "myData",
  }),
});
// console.log(sqlite3.verbose());
const sq = sqlite3.verbose();
console.log(sq);

let db;

const conectDb = async (data) => {
  const { me } = data;
  console.log(me, "me");
  me &&
    (db = new sq.Database(`./db/${me["_serialized"]}.db`, (err) => {
      if (err) {
        return console.error(err.message, "Error");
      }
      console.log("Connected to the in-memory SQlite database.");
    }));
};
const createDb = (data) => {
  const { me } = data;
  console.log(me, "me");
  me &&
    (db = new sq.Database(`./db/${me["_serialized"]}.db`, (err) => {
      if (err) {
        return console.error(err.message, "Error");
      }
      console.log("Connected to the in-memory SQlite database.");
    }));
  db.serialize(() => {
    try {
      // db.run(`SELECT * FROM mensaje`);
      // db.run(`CREATE TABLE IF NOT EXISTS usuario (
      //     "usuario_id" INTEGER UNIQUE,
      //     userNumber TEXT UNIQUE,
      //     PRIMARY KEY (usuario_id))
      //     ;`);
      db.run(`CREATE TABLE IF NOT EXISTS respuesta (
                  res_id INTEGER UNIQUE,
                 body TEXT,
                  remote TEXT,
                  dateSend TEXT,
                 result TEST,
              PRIMARY KEY (res_id));`);
      // db.run(`CREATE TABLE IF NOT EXISTS "mensaje" (
      //         "mensaje_id" INTEGER UNIQUE,
      //         "mensaje" TEXT NOT NULL,
      //         usuario_fk INTEGER,
      //         PRIMARY KEY ("mensaje_id"),
      //         FOREIGN KEY (usuario_fk)
      //         REFERENCES usuario(usuario_id)
      //     );`);
      db.run(`CREATE INDEX IF NOT EXISTS tabla_index ON respuesta (remote);`);
    } catch (error) {}
    //   try {
    //     db.run(`SELECT * FROM usuario`);

    //     db.run(`CREATE INDEX tabla_index ON usuario (usuario_id, userNumber);`);
    //   } catch (e) {
    //     db.run(`CREATE TABLE "usuario" (
    //         "usuario_id" INTEGER UNIQUE AUTOINCREMENT,
    //         "userNumber" TEXT UNIQUE,
    //         "mensaje_id_fk" INTEGER
    //         PRIMARY KEY ("usuario_id", "userNumber")
    //         FOREIGN KEY ("mensaje_id_fk")
    //         REFERENCES mensaje(mensaje_id)
    //     );`);
    //     console.log(e, "error");
    //   }
  });
  db.close();
};
// db.close();
// let db = new sq.Database('./db/test.db', (err) => {
//     if (err) {
//       return console.error(err.message,"Error");
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });

// const db = new sqlite.Database(':memory:');
// When the client is ready, run this code (only once)
client.once("ready", (user) => {
  console.log(user, client);
  client.info && createDb(client.info);
  console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
});
const error = (e) => console.log(e, "error general");
// Start your client

client.on("message_create", async (message) => {
  //   console.log(message);
  console.log("================================================");
  //   console.log("client");
  //   Object.entries(client.info).forEach(([key, value]) =>
  //     console.log(`key=${key}=>${value}`, "key=>value")
  //   );
  //   console.log(message["_data"]);
  //   client.sendMessage(message["_data"].from, "hola");
  //   RETURNING *
  // INSERT INTO mensaje(mensaje) VALUES(?)
  //   db.serialize(() => {
  //     db.run(
  //       `INSERT INTO usuario(userNumber) VALUES(?)`,
  //       [message["_data"].id.remote],
  //       function (err) {
  //         if (err) error(err);
  //         console.log(this);
  //         this.changes &&
  //           db.run(
  //             `INSERT INTO mensaje(mensaje,usuario_fk) VALUES(?)`,
  //             [message["_data"].body, this.lastID],
  //             function (err) {
  //               if (err) error(err);
  //               console.log(this);
  //             }
  //           );
  //       }
  //     );
  //   });
  // (`SELECT result,dateSend ,res_id from respuesta R
  // ORDER BY
  //     R.res_id DESC
  // 	LIMIT 2`)
  const promptExplecito = `Eres Fernanda, el asistente de Emprendedores Top, una empresa que ofrece productos
  digitales en Ecuador. Tu misión es proporcionar información sobre el Mega Pack con más de
  2,000 plantillas para Elementor y persuadir al cliente para que realice la compra. Aquí tienes
  los detalles que necesitas conocer ,Saluda amablemente al cliente y pregúntale su nombre para dirigirte a él de manera
  personalizada , y solo pide el nombre una vez y si ya te dijo el nombre contestale por el nombre. Ejemplo: ¡Hola! Soy Mauricio, el asistente de Emprendedores Top. ¿Cuál es tu nombre?😊;
  Explica brevemente el producto:
  El Mega Pack incluye más de 2,000 plantillas de alta conversión listas para importar y trabajar
  con Elementor en la versión gratuita.
  Incluye páginas para infoproductos en nichos como mascotas, belleza, emprendimiento,
  marketing y salud y mucho más, Resalta los beneficios:
  Estas plantillas te permitirán crear sitios web profesionales de manera rápida y sencilla,
  ahorrando tiempo y recursos.🚀
  Aquí tienes un demo: demo.com;
  debes explicar tambien los Bonos Extras:
  Bono 1: Plugin Elementor Pro
  Bono 2: Plugin Rocket para acelerar las páginas
  Bono 3: Más de 1,000 diseños en Canva para crear anuncios efectivos.
  Estos bonos adicionales te brindan herramientas valiosas para potenciar tu negocio digital ; 
  Tambien tener en cuanta los precios por País:
  Colombia: 20,425.997 COP
  Ecuador: $4,99 dólares
  Perú: 18,680 PEN
  Argentina: 4,701.289 ARS ; siempre pregunta desde que pais esta escribiendo solo si en la pregunta que te haga el cliente no esta especificado el pais;
  Debes tener en cuanta también la disponibilidad : El producto solo está disponible para Ecuador, Colombia, Perú y Argentina.
  muy importante que sepas los Métodos de Pago por pais 
  Ecuador: Transferencia bancaria.
  Fuera de Ecuador: Tarjetas de crédito o débito Visa y Mastercard a través de la pasarela de
  pagos de Payphone,  y siempre ofreciendo el enlace de pago que es este "payphone.com" , solo si te lo piden.
   responde teniendo en cuenta que ya se te pregunto esto : ":body" y tu respondiste esto :  ":result" ; entonces responde teniendo en cuenta quien eres y lo que sabes a esto : `;
  const promptNomal = `Eres Fernanda, el asistente de Emprendedores Top, una empresa que ofrece productos
   digitales en Ecuador. Tu misión es proporcionar información sobre el Mega Pack con más de
   2,000 plantillas para Elementor y persuadir al cliente para que realice la compra. solo respondes preguntas sobre la empresa a la que perteneces y respondes al nombre de Fernanda, esta presta estos servicios.`;
  message["_data"].id.remote !== "573009111152@c.us" &&
    !message["_data"].id.fromMe &&
    message["_data"].body !== "stop" &&
    (async () => {
      client.info && (await conectDb(client.info));
      //   console.log(db,"db")
      let respuesta, body, prevData;
      //   let prevData =null;
      //   console.log(respuesta);
      db.serialize(() => {
        // console.log(``);
        db.get(
          `SELECT body,result,dateSend,res_id from respuesta R
          WHERE R.remote = ?
          ORDER BY
              R.res_id DESC
              LIMIT 1`,
          [message["_data"].id.remote],
          async (err, row) => {
            if (err) error(err);
            // return (
            console.log(row, "ROW");
            if (row) {
              respuesta = row.result;
              body = row.body;
              await fetch(
                `https://cheetah-api.builderall.com/gpt?message=${
                  respuesta
                    ? promptExplecito
                        .replace(":body", body)
                        .replace(":result", respuesta)
                    : promptNomal
                } ${message["_data"].body}?`,
                {
                  headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "es-ES,es;q=0.9,pt;q=0.8",
                    // "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                    // "sec-ch-ua-mobile": "?0",
                    // "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    Referer: "https://cheetah-editor.builderall.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                  },
                  body: null,
                  method: "GET",
                }
              )
                .then((res) => res.json())
                .then(async (pages) => {
                  //   console.log(pages.join(";").replaceAll(";", "\n"));
                  client.sendMessage(
                    message["_data"].from,
                    pages.join(";").replaceAll(";", "\n")
                  );
                  //   const { body, id } = message["_data"];
                  client.info && (await conectDb(client.info));
                  console.log(db, "db");
                  db.serialize(() => {
                    db.run(
                      `INSERT INTO respuesta(body,remote,dateSend,result) VALUES(?,?,?,?)`,
                      [
                        message["_data"].body,
                        message["_data"].id.remote,
                        new Date().toJSON(),
                        pages.join(";").replaceAll(";", "\n"),
                      ],
                      function (err) {
                        if (err) error(err);
                        console.log(this, "RETURNING ");
                      }
                    );
                  });
                })
                .catch((e) => {
                  console.log(e, "error");
                });
              return row;
            } else {
              console.log("no");
            }
            // row && (()=>{
            // })();
            // :(()=>{

            // })()
            // )
          }
        );
      });
      // await(async()=>{

      // })();
      console.log(respuesta, body, "respuesta,body");
    })();
  //   if ((message["_data"].body === "hola" || message["_data"].body.length !== 0) && message["_data"].body !== "stop" && message["_data"].id.remote !== '573146072645@c.us') {
  //     // send back "pong" to the chat the message was sent in
  //    await fetch(
  //       `https://cheetah-api.builderall.com/gpt?message=${message["_data"].body}`,
  //       {
  //         headers: {
  //           accept: "application/json, text/plain, */*",
  //           "accept-language": "es-ES,es;q=0.9,pt;q=0.8",
  //           // "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
  //           // "sec-ch-ua-mobile": "?0",
  //           // "sec-ch-ua-platform": "\"Windows\"",
  //           "sec-fetch-dest": "empty",
  //           "sec-fetch-mode": "cors",
  //           "sec-fetch-site": "same-site",
  //           Referer: "https://cheetah-editor.builderall.com/",
  //           "Referrer-Policy": "strict-origin-when-cross-origin",
  //         },
  //         body: null,
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((pages) => {
  //         console.log(pages.join(';').replaceAll(";",'\n'))
  //         client.sendMessage(message.from, pages.join(';').replaceAll(";",'\n'));
  //     }).catch(e=>{
  //         console.log(e,"error");
  //     });

  //   }
});
client.initialize();
