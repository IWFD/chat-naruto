const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const faker = require('faker');

// Lista de nomes de personagens do anime Naruto
const characterNames = [
  "Naruto Uzumaki",
  "Sasuke Uchiha",
  "Sakura Haruno",
  "Kakashi Hatake",
  "Shikamaru Nara",
  "Ino Yamanaka",
  "Choji Akimichi",
  "Hinata Hyuga",
  "Neji Hyuga",
  "Rock Lee",
  "Tenten",
  "Kiba Inuzuka",
  "Shino Aburame",
  "Gaara",
  "Kankuro",
  "Temari",
  "Orochimaru",
  "Jiraiya",
  "Tsunade",
  "Orochimaru",
  "Itachi Uchiha",
  "Kisame Hoshigaki",
  "Deidara",
  "Sasori",
  "Hidan",
  "Kakuzu",
  "Pain",
  "Konan",
  "Minato Namikaze",
  "Kushina Uzumaki",
  "Hashirama Senju",
  "Tobirama Senju",
  "Madara Uchiha",
  "Obito Uchiha",
  "Rin Nohara",
  "Killer Bee"
];

app.use(express.static('public'));

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  const nickname = faker.random.arrayElement(characterNames);
  console.log('Novo usuário conectado:', nickname);

  socket.on('chat message', (msg) => {
    console.log(`Mensagem recebida de ${nickname}: ${msg}`);
    io.emit('chat message', `${nickname}: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', nickname);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
