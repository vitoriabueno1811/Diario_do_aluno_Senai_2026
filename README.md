# SENAI | LER/PSOF1 project

## Site teste no Canva
[DiárioDoAlunoSESI](https://beatrizalvesportfolio.my.canva.site/di-rio-do-alunosesi)

## Site atualizado
[DiárioDoAlunoSESI](https://versed-sesi-connect-hub.base44.app/)
## Tecnologias utilizadas
|Tecnologia|Descrição|
|-|-|
|[Draw.io](https://app.diagrams.net/)|Diagramas de Caso de Uso|Wireframes|
|[Canva](https://www.canva.com/)|Site|Apresentação de Slides|
|Microsoft Excel|Planilhas|Tabelas|
|Microsoft Word|Projeto|Documento de Requisitos|

### Funções (2° semestre)
##### 08/10/2026
- Ana Beatriz : Back-End, README.md....
- Breno : Back-End
- Letícia : DER
- Sara : Site do projeto
- Vitória : Banco de dados

# Código SQL (Banco de Dados) 

## Script SQL DDL

```CREATE SCHEMA IF NOT EXISTS Diario_Aluno_SESI;
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
USE estoque_loja;
...
```
