const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const lerDados = () => {
    const dadosRaw = fs.readFileSync('./dados.json');
    return JSON.parse(dadosRaw);
};

const salvarDados = (db) => {
    fs.writeFileSync('./dados.json', JSON.stringify(db, null, 2)); 
};


app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const db = lerDados();

    const usuario = db.usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (usuario) {
        return res.status(200).json({
            status: "sucesso",
            usuario: {
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } else {
        return res.status(401).json({
            status: "erro",
            mensagem: "E-mail ou senha incorretos."
        });
    }
});

app.get('/api/desempenho', (req, res) => {
    const db = lerDados();
    res.json(db.desempenho);
});

app.get('/api/provas', (req, res) => {
    const db = lerDados();
    res.json(db.provas);
});

app.post('/api/provas', (req, res) => {
    const db = lerDados();

    const novaProva = {
        id: db.provas.length > 0
            ? Math.max(...db.provas.map(p => p.id)) + 1
            : 1,
        materia: req.body.materia,
        data: req.body.data,
        horario: req.body.horario,
        conteudo: req.body.conteudo
    };

    db.provas.push(novaProva);
    salvarDados(db);

    res.status(201).json(novaProva);
});

app.put('/api/provas/:id', (req, res) => {
    const db = lerDados();
    const id = Number(req.params.id);

    const indice = db.provas.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Prova não encontrada."
        });
    }

    db.provas[indice] = {
        ...db.provas[indice],
        materia: req.body.materia,
        data: req.body.data,
        horario: req.body.horario,
        conteudo: req.body.conteudo
    };

    salvarDados(db);

    res.json(db.provas[indice]);
});

app.delete('/api/provas/:id', (req, res) => {
    const db = lerDados();
    const id = Number(req.params.id);

    const indice = db.provas.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Prova não encontrada."
        });
    }
    db.provas.splice(indice, 1);
    salvarDados(db);
    res.json({
        mensagem: "Prova excluída com sucesso."
    });
});

app.get('/api/avisos', (req, res) => {
    const db = lerDados();
    res.json(db.avisos);
});

app.listen(PORT, () => {
    console.log(`Servidor do Diário do Aluno rodando em http://localhost:${PORT}`);
});