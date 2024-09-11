const express = require("express");
const fsp = require("fs/promises");
const path = require("path");

const caminhoArquivo = path.join(__dirname, "dados.txt");
const servidor = express();

servidor.use(express.json());

servidor.get("/dados", async (_req, res) => {
  // Lê o conteúdo do arquivo de forma assíncrona
  let dados = await fsp.readFile(caminhoArquivo, "utf8");
  // Processa o conteúdo lido
  dados = dados
    .split("\r")
    .join("")
    .split("\n")
    .filter((linha) => linha.trim() !== "");

  res.status(200).json({ conteudo: dados });
});

servidor.listen(3000, () => console.log("Servidor está rodando... 🔥"));
