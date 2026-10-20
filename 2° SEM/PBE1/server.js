const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const arquivoDados = path.join(__dirname, 'dados.json');

const lerDados = () => {
    const dadosRaw = fs.readFileSync(arquivoDados, 'utf8');
    return JSON.parse(dadosRaw);
};

const salvarDados = (db) => {
    fs.writeFileSync(
        arquivoDados,
        JSON.stringify(db, null, 2),
        'utf8'
    );
};

app.get('/api/usuarios', (req, res) => {
    const db = lerDados();

    const usuarios = db.usuarios.map(
        ({ senha, ...usuario }) => usuario
    );

    res.json(usuarios);
});
app.get('/api/usuarios', (req, res) => {
    const db = lerDados();
    const nome = req.params.nome;

    const usuario = db.usuarios.find(
        u => u.nome === nome
    );

    if (!usuario) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado.'
        });
    }

    const { senha, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
});
app.post('/api/usuarios', (req, res) => {
    const db = lerDados();
    const { nome, email, senha } = req.body;

    if (
        typeof nome !== 'string' || !nome.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof senha !== 'string' || !senha
    ) {
        return res.status(400).json({
            mensagem: 'Informe nome, e-mail e senha.'
        });
    }

    const existe = db.usuarios.some(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            mensagem: 'Já existe um usuário com esse e-mail.'
        });
    }
    const novoUsuario = {
        nome: nome.trim(),
        email: email.trim(),
        senha
    };

    db.usuarios.push(novoUsuario);
    salvarDados(db);

    res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso.',
        usuario: {
            nome: novoUsuario.nome,
            email: novoUsuario.email
        }
    });
});
app.put('/api/usuarios', (req, res) => {
    const db = lerDados();
    const nomeAtual = req.params.nome;

    const indice = db.usuarios.findIndex(
        u => u.nome === nomeAtual
    );
    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado.'
        });
    }
    const { nome, email, senha } = req.body;
    const usuarioAtual = db.usuarios[indice];
    if (
        nome !== undefined &&
        (typeof nome !== 'string' || !nome.trim())
    ) {
        return res.status(400).json({
            mensagem: 'Informe um nome válido.'
        });
    }
    if (
        email !== undefined &&
        (typeof email !== 'string' || !email.trim())
    ) {
        return res.status(400).json({
            mensagem: 'Informe um e-mail válido.'
        });
    }

    if (
        senha !== undefined &&
        (typeof senha !== 'string' || !senha)
    ) {
        return res.status(400).json({
            mensagem: 'Informe uma senha válida.'
        });
    }
    const novoEmail = email?.trim() || emailAtual;
    const emailEmUso = db.usuarios.some(
        (u, i) =>
            i !== indice &&
            u.email.toLowerCase() === novoEmail.toLowerCase()
    );
    if (emailEmUso) {
        return res.status(409).json({
            mensagem: 'Esse e-mail já está sendo usado.'
        });
    }
    db.usuarios[indice] = {
        ...usuarioAtual,
        nome: nome === undefined ? usuarioAtual.nome : nome.trim(),
        email: novoEmail,
        senha: senha === undefined ? usuarioAtual.senha : senha
    };

    salvarDados(db);
    const { senha: senhaSalva, ...usuarioSemSenha } =
        db.usuarios[indice];

    res.json({
        mensagem: 'Usuário atualizado com sucesso.',
        usuario: usuarioSemSenha
    });
});
app.delete('/api/usuarios', (req, res) => {
    const db = lerDados();
    const nome = req.params.nome;
    const indice = db.usuarios.findIndex(
        u => u.nome === nome
    );
    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado.'
        });
    }
    db.usuarios.splice(indice, 1);
    salvarDados(db);
    res.json({
        mensagem: 'Usuário excluído com sucesso.'
    });
});
app.get('/api/desempenho', (req, res) => {
    const db = lerDados();
    res.json(db.desempenho);
});
app.get('/api/materias', (req, res) => {
    const db = lerDados();
    res.json(db.desempenho.materias);
});
app.get('/api/materias/:nome', (req, res) => {
    const db = lerDados();
    const nome = req.params.nome;

    const materia = db.desempenho.materias.find(
        m => m.nome.toLowerCase() === nome.toLowerCase()
    );
    if (!materia) {
        return res.status(404).json({
            mensagem: 'Matéria não encontrada.'
        });
    }
    res.json(materia);
});
app.post('/api/materias', (req, res) => {
    const db = lerDados();
    const { nome, nota } = req.body;

    if (
        typeof nome !== 'string' ||
        !nome.trim() ||
        typeof nota !== 'number' ||
        !Number.isFinite(nota) ||
        nota < 0 ||
        nota > 10
    ) {
        return res.status(400).json({
            mensagem: 'Informe o nome e uma nota entre 0 e 10.'
        });
    }

    const existe = db.desempenho.materias.some(
        m => m.nome.toLowerCase() === nome.trim().toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            mensagem: 'Essa matéria já está cadastrada.'
        });
    }

    const novaMateria = {
        nome: nome.trim(),
        nota
    };

    db.desempenho.materias.push(novaMateria);
    salvarDados(db);

    res.status(201).json(novaMateria);
});
app.put('/api/materias/:nome', (req, res) => {
    const db = lerDados();
    const nomeAtual = req.params.nome;

    const indice = db.desempenho.materias.findIndex(
        m => m.nome.toLowerCase() === nomeAtual.toLowerCase()
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Matéria não encontrada.'
        });
    }

    const { nome, nota } = req.body;
    const materiaAtual = db.desempenho.materias[indice];

    if (
        nome !== undefined &&
        (typeof nome !== 'string' || !nome.trim())
    ) {
        return res.status(400).json({
            mensagem: 'Informe um nome válido.'
        });
    }

    if (
        nota !== undefined &&
        (typeof nota !== 'number' ||
        !Number.isFinite(nota) ||
        nota < 0 ||
        nota > 10)
    ) {
        return res.status(400).json({
            mensagem: 'A nota deve estar entre 0 e 10.'
        });
    }
    const novoNome = nome === undefined
        ? materiaAtual.nome
        : nome.trim();

    const novaNota = nota === undefined
        ? materiaAtual.nota
        : nota;

    const nomeEmUso = db.desempenho.materias.some(
        (m, i) =>
            i !== indice &&
            m.nome.toLowerCase() === novoNome.toLowerCase()
    );

    if (nomeEmUso) {
        return res.status(409).json({
            mensagem: 'Já existe uma matéria com esse nome.'
        });
    }

    db.desempenho.materias[indice] = {
        nome: novoNome,
        nota: novaNota
    };

    salvarDados(db);
    res.json(db.desempenho.materias[indice]);
});
app.delete('/api/materias/:nome', (req, res) => {
    const db = lerDados();
    const nome = req.params.nome;

    const indice = db.desempenho.materias.findIndex(
        m => m.nome.toLowerCase() === nome.toLowerCase()
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Matéria não encontrada.'
        });
    }

    db.desempenho.materias.splice(indice, 1);
    salvarDados(db);

    res.json({
        mensagem: 'Matéria excluída com sucesso.'
    });
});
app.get('/api/provas', (req, res) => {
    const db = lerDados();
    res.json(db.provas);
});
app.post('/api/provas', (req, res) => {
    const db = lerDados();
    const { materia, data, horario, conteudo } = req.body;

    if (!materia || !data || !horario || !conteudo) {
        return res.status(400).json({
            mensagem: 'Informe matéria, data, horário e conteúdo.'
        });
    }

    const novaProva = {
        id: db.provas.length > 0
            ? Math.max(...db.provas.map(p => p.id)) + 1
            : 1,
        materia,
        data,
        horario,
        conteudo
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
            mensagem: 'Prova não encontrada.'
        });
    }

    db.provas[indice] = {
        ...db.provas[indice],
        ...req.body,
        id: db.provas[indice].id
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
            mensagem: 'Prova não encontrada.'
        });
    }

    db.provas.splice(indice, 1);
    salvarDados(db);

    res.json({
        mensagem: 'Prova excluída com sucesso.'
    });
});
app.get('/api/avisos', (req, res) => {
    const db = lerDados();
    res.json(db.avisos);
});
app.listen(PORT, () => {
    console.log(
        `Servidor do Diário do Aluno rodando em http://localhost:${PORT}`
    );
});