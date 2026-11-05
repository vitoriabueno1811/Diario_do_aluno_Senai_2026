CREATE SCHEMA IF NOT EXISTS Diario_Aluno_SESI;
USE diario_aluno_sesi;

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

INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Ana Beatriz Alvez de Lima', 'anaalves@portalsesisp.org.br', 'Sesi@RM', 'Aluno'),
('Leticia Aparecida Pinto de Souza','leticiaapsouza@portalsesisp.org.br','Sesi@RM','Aluno'),
('Sara de paula Sousa','Saradepaula@portalsesisp.org.br','Sesi@RM','Aluno');

INSERT INTO disciplinas (nome, descricao) VALUES 
('Matemática', 'Estudo de Análise Combinatória e funções.'),
('Física', 'Fundamentos de óptica e Ondulatória.'),
('Língua Portuguesa', 'Gramática, Redação e Escolas Literárias.');

INSERT INTO turmas (nome_turma, ano_letivo) VALUES 
('1º Ano EM - A', 2026),
('2º Ano EM - B', 2026),
('3º Ano EM - A', 2026);

INSERT INTO horarios_aulas (id_turma, id_disciplina, dia_da_semana, cronograma) VALUES 
(1,3,1,'Quarta-feira',07:50 - 08:40),
(2,2,2,'Sexta-feira',08:40 - 09:30),
(3,1,3,'Segunda-feira',09:30 - 10:20);

INSERT INTO notas (id_aluno, id_disciplina, nota_boletim, nota_avalia_sesi, nota_rubrica) VALUES 
(2, 1, 8.50, 7.80, 9.00),
(2, 2, 7.00, 6.50, 8.00), 
(3, 1, 9.00, 8.50, 9.50); 

INSERT INTO frequencias (id_aluno, id_disciplina, data_aula) VALUES 
(2, 1, '2026-11-03'),
(2, 2, '2026-11-03'),
(3, 1, '2026-11-03');

INSERT INTO avisos (id_professor, id_turma, titulo, tipo, mensagem, data_mensagem) VALUES 
(1, 1, 'Simulado Avalia SESI', 'Importante', 'Lembrando que o simulado ocorrerá na próxima sexta-feira. Favor não faltem.', '2026-11-05'),
(1, 1, 'Entrega de Trabalhos', 'Prazo', 'Prazo final para envio do relatório de Física pelo email educacional.', '2026-11-05'),
(1, 2, 'Reunião de Alunos', 'Geral', 'Reunião para os pais sobre a feira de ciências.', '2026-11-05');










