const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// get all user
app.get("/", (req, res) => {
    console.log(req.query)
    db.query("SELECT * FROM user",(err, result) => {
        if (err) {
            res.json({ err: err });
        }
        res.json(result);
    })
});

// get user by id
app.get("/info", (req, res) => {
    const id = req.query.id;
    
    db.query("SELECT image, description, id, pseudo, privilege, creationdate FROM user where id=?;",id,(err, result) => {
        if (err) {
            res.json({ err: err });
        }
        res.json(result);
    })
});

// get public room
app.get("/publicroom", (req, res) => {
  db.query("SELECT * FROM room where type=?;",1,(err, result) => {
      if (err) {
          res.json({ err: err });
      }
      res.json(result);
  })
});

app.post("/login", (req, res) => {
    const pseudo = req.body.pseudo;
    const mdp = req.body.mdp;

    db.query(
      "SELECT * FROM user WHERE pseudo = ? and mdp = ?;", [pseudo, mdp],(err, result) => {
        if (err) {
            res.send({ err: err });
        } else if (result.length != 0) {
            res.send(result[0]);
        } else {
            res.send({ message: "Identifiants invalides." });
        }
      }
    );
  });

  app.get("/countmsg", (req, res) => {
    const id = req.query.id;
    
    db.query("SELECT count(*) FROM message where userid=?;",id,(err, result) => {
        if (err) {
            res.json({ err: err });
        }
        res.json(result);
    })
});

  app.post("/signup", (req, res) => {
    const pseudo = req.body.pseudo;
    const mdp = req.body.mdp;
    const mail = req.body.mail;
    const image = req.body.image;
    const description = req.body.description;

    db.query(
      "INSERT INTO `user`(`pseudo`, `mdp`, `mail`,`image`, `description`, `creationdate`) VALUES (?,?,?,?,?,now());", [pseudo, mdp, mail,image,description],(err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ message: "La création du compte à fonctionné." });
        }
      }
    );
  });


  // get message by id
app.get("/message", (req, res) => {
    const id = req.query.id;
    
    db.query("SELECT message.id, message.text, message.senddate, user.pseudo, user.image, message.userid FROM message, user where message.roomid=? and message.userid = user.id;",id,(err, result) => {
        if (err) {
            res.json({ err: err });
        }
        res.json(result);
    })
});


app.post("/newmessage", (req, res) => {
    const text = req.body.text;
    const roomid = req.body.roomid;
    const userid = req.body.userid;

    db.query(
      "INSERT INTO `message`(`text`, `userid`, `roomid`,`senddate`) VALUES (?,?,?,now());", [text, userid, roomid],(err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ message: "L'envoie du message a bien été prit en compte'." });
        }
      }
    );
  });

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

