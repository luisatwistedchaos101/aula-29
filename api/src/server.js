const express = require("express");
const fsp = require("fs/promises");
const path = require("path");

const caminhoArquivo = path.join(__dirname, "dados.txt");
const servidor = express();

servidor.use(express.json());

servidor.get("/dados", async (_req, res) => {
  try {
    // Lê o conteúdo do arquivo de forma assíncrona
    let dados = await fsp.readFile(caminhoArquivo, "utf8");
    // Processa o conteúdo lido
    dados = dados
      .split("\r")
      .join("")
      .split("\n")
      .filter((linha) => linha.trim() !== "");

    res.status(200).json({ conteudo: dados });
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro.message);

    res
      .status(500)
      .json({ erro: "Erro ao ler o arquivo", detalhes: erro.message });
  }
});

servidor.put("/dados", async (req, res) => {
  try {
    // Valida o conteúdo de entrada
    let { conteudo } = req.body;
    if (!conteudo ) {
      return res.status(400).json({ erro: "Conteúdo inválido" });
    }

    // Lê o conteúdo existente do arquivo de forma assíncrona
    let dados = await fsp.readFile(caminhoArquivo, "utf8");

    // Escreve o conteúdo atualizado de volta ao arquivo de forma assíncrona
    await fsp.writeFile(caminhoArquivo, dados);

    res.json({ messagem: "Conteúdo adicionado com sucesso" });
  } catch (erro) {
    // Loga o erro para monitoramento
    console.error("Erro ao escrever no arquivo:", erro.message);
    // Retorna uma resposta de erro detalhada
    res
      .status(500)
      .json({ erro: "Erro ao processar o arquivo", detalhes: erro.message });
  }
});

servidor.listen(3000, () => console.log("Servidor está rodando... 🔥"));
