# SENAI | LER/PSOF1 project

## Site teste no Canva
[DiárioDoAlunoSESI](https://beatrizalvesportfolio.my.canva.site/di-rio-do-alunosesi)

## Site atualizado
[DiárioDoAlunoSESI](https://versed-sesi-connect-hub.base44.app/)  

## Tecnologias utilizadas 1/2° semestre
|Tecnologia|Descrição|
|-|-|
``` 1° semestre ```
|[Draw.io](https://app.diagrams.net/)|Diagramas de Caso de Uso|Wireframes|
|[Canva](https://www.canva.com/)|Site|Apresentação de Slides|
|Microsoft Excel|Planilhas|Tabelas|
|Microsoft Word|Projeto/Documento de Requisitos|
``` 2° semestre ```
|VS Code|Banco de Dados / Back-End / LIMA / Site em HTML|
|JSON| Formato em texto para Banco de Dados|
|CSV| Formato de tabela para Banco de Dados|
|HTML| Define a estrutura de um site na internet| 
|CSS| É a estilização do código -> index.html|
|Java Script| Linguagem de programação interpretada|
|MySQL| Tecnologia para Banco de Dados|
|XAMPP| Execução em SQL e Banco de Dados|
|Node JS| Executar o Java Script fora do navegador|
|Draw.io| MER & DER|
|Thunder Client| Testes do servidor no próprio VS Code|



## Funções (2° semestre)
#### 08/10/2026
- *Ana Beatriz Alves de Lima :* Back-End, README.md....
- *Breno Frazão Callegari :* Back-End
- *Letícia Aparecida Pinto de Souza :* DER
- *Sara de Paula Souza :* Site do projeto
- *Vitória Bueno da Silva :* Banco de dados

```
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
```

## Dicionário de Dados
---
|Dicionario de Dados|
|Entidade|Atributo|Tipo|Tamanho|Descricao|
|-|-|-|-|-|
|usuarios|id|int|11|Chave primaria do Usuario|
|usuarios|nome|varchar|100|Nome do Usuario|
|usuarios|email|varchar|100|email do Usuario|
|usuarios|senha|varchar|25|senha do Usuario|
|usuarios|tipo|varchar|20|categoria do Usuario|
|avisos|id|int|11|Chave primaria de avisos|
|avisos|id_professor|int|11|Chave estrangeira referente a avisos|
|avisos|id_turma|int|11|Cahve estrangeira referente a avisos|
|avisos|titulo|varchar|150|titulo da mensagem do aviso|
|avisos|tipo|varchar|20|tipo de mensagem|
|avisos|mensagem|varchar|500|mensagem inserida|
|avisos|data_mensagem|DATE|--|data da mensagem|
|horario_aulas|id|int|11|Chave primaria de horario_aulas|
|horario_aulas|id_turma|int|11|Chave estrangeira referente a horario_aulas|
|horario_aulas|id_disciplina|int|11|Chave estrangeira referente a horario_aulas|
|horario_aulas|dia_da_semana|varchar|50|dia da semana|
|horario_aulas|cronograma|decimal|10.2|horario das aulas|
|disciplinas|id|int|11|Chave primaria da disciplinas|
|disciplinas|nome|varchar|100|Nome da disciplinas|
|disciplinas|descricao|varchar|200|descricao das disciplinas|
|Turmas|id|int|11|Chave primaria da Turmas|
|Turmas|nome|varchar|50|Nome da turma|
|Turmas|ano_letivo|varchar|100|ano letivo da turma|
|Frenquencias|id|int|11|Chave primaria da Frenquencias|
|Frenquencias|id_aluno|int|11|Chave estrangeira referente a Frenquencias|
|Frenquencias|id_disciplina|int|11|Chave estrangeira referente a Frenquencias|
|Frenquencias|data_aula|DATE| -- |Data da Aula|
|Notas|id|int|11|Chave primaria das Notas|
|Notas|id_aluno|int|11|Chave estrangeira referente a Notas|
|Notas|id_disciplina|int|11|Chave estrangeira referente a Notas|
|Notas|nota_boletim|Decimal|10.2|Nota do Boletim|
|Notas|nota_avalia_sesi|Decimal|10.2| Nota do Avalia Sesi|
|Notas|nota_rubrica|Decimal|10.2|Nota da Rubrica|