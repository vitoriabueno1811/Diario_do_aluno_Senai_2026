CREATE SCHEMA IF NOT EXISTS Diario_Aluno_SESI;
USE Diario_Aluno_SESI;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);


CREATE TABLE disciplinas (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

CREATE TABLE turmas (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(50) NOT NULL,
    ano_letivo INT NOT NULL
);

CREATE TABLE horarios_aulas (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_turma INT NOT NULL,
    id_disciplina INT NOT NULL,
    dia_da_semana INT NOT NULL,
    cronograma INT NOT NULL
);

CREATE TABLE notas (
    id_notas INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_disciplina INT NOT NULL,
    nota_boletim DECIMAL(10, 2),
    nota_avalia_sesi DECIMAL(10, 2), 
    nota_rubrica DECIMAL(10, 2)            
);


CREATE TABLE frequencias (
    id_frequencia INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_disciplina INT NOT NULL,
    data_aula DATE NOT NULL
);

CREATE TABLE avisos (
    id_avisos INT AUTO_INCREMENT PRIMARY KEY,
    id_professor INT NOT NULL,
    id_turma INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(20),
    mensagem VARCHAR(500) NOT NULL,
    data_mensagem DATE NOT NULL
);

ALTER TABLE notas
    ADD CONSTRAINT fk_notas_aluno FOREIGN KEY (id_aluno) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    ADD CONSTRAINT fk_notas_disciplina FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina) ON DELETE CASCADE;
ALTER TABLE frequencias
    ADD CONSTRAINT fk_frequencias_aluno FOREIGN KEY (id_aluno) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    ADD CONSTRAINT fk_frequencias_disciplina FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina) ON DELETE CASCADE;
ALTER TABLE avisos
    ADD CONSTRAINT fk_avisos_professor FOREIGN KEY (id_professor) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    ADD CONSTRAINT fk_avisos_turma FOREIGN KEY (id_turma) REFERENCES turmas(id_turma) ON DELETE CASCADE;
ALTER TABLE horarios_aulas
    ADD CONSTRAINT fk_horarios_turma FOREIGN KEY (id_turma) REFERENCES turmas(id_turma) ON DELETE CASCADE,
    ADD CONSTRAINT fk_horarios_disciplina FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina) ON DELETE CASCADE;

    USE Diario_Aluno_SESI;

-- USUÁRIOS
SELECT * FROM usuarios;
INSERT INTO usuarios (nome, email, senha, tipo)
VALUES
('Ana Silva', 'ana@email.com', '123456', 'aluno'),
('Pedro Santos', 'pedro@email.com', '123456', 'aluno'),
('Mariana Costa', 'mariana@email.com', '123456', 'professor');


-- DISCIPLINAS
SELECT * FROM disciplinas;
INSERT INTO disciplinas (nome, descricao)
VALUES
('Matemática', 'Estudo de números e cálculos'),
('Português', 'Estudo da língua portuguesa'),
('História', 'Estudo dos acontecimentos históricos');


-- TURMAS
SELECT * FROM turmas;
INSERT INTO turmas (nome_turma, ano_letivo)
VALUES
('1A', 2026),
('2A', 2026),
('3A', 2026);


-- HORÁRIOS_AULAS
SELECT * FROM horarios_aulas;
INSERT INTO horarios_aulas (id_turma, id_disciplina, dia_da_semana, cronograma)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3);


-- NOTAS
SELECT * FROM notas;
INSERT INTO notas (id_aluno, id_disciplina, nota_boletim, nota_avalia_sesi, nota_rubrica)
VALUES
(1, 1, 8.50, 9.00, 8.00),
(2, 2, 7.50, 8.00, 9.00),
(1, 3, 9.00, 8.50, 9.50);


-- FREQUÊNCIAS
SELECT * FROM frequencias;
INSERT INTO frequencias (id_aluno, id_disciplina, data_aula)
VALUES
(1, 1, '2026-10-20'),
(2, 2, '2026-10-20'),
(1, 3, '2026-10-21');


-- AVISOS
SELECT * FROM avisos;
INSERT INTO avisos (id_professor, id_turma, titulo, tipo, mensagem, data_mensagem)
VALUES
(3, 1, 'Prova de Matemática', 'Prova', 'A prova será realizada na próxima semana.', '2026-11-05'),
(3, 2, 'Entrega de trabalho', 'Trabalho', 'Entregar o trabalho de Português até sexta-feira.', '2026-11-05'),
(3, 3, 'Reunião escolar', 'Aviso', 'Haverá reunião escolar na próxima semana.', '2026-11-05');
