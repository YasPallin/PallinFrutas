-- DB mercado / 4 tabelas: vendas, fornecedoes, clientes e produtos

-- apaga a database para limpar (NÃO RECOMENDADO FAZER!!!)
DROP DATABASE mercado;

-- cria o banco de dados
CREATE DATABASE mercado;

-- escolhe usar o bd:
USE mercado;

-- faz a limpa nas tabelas para poder rodar novamente
-- para excluir é necessário apagar primeiramente dar drop onde tem a FK:
DROP TABLE vendas;
DROP TABLE produtos;
DROP TABLE clientes;
DROP TABLE fornecedoes;

-- na hora de criar é quem não tem FK primeiro:

-- cria tabela de clientes (cliente não tem FK)
CREATE TABLE IF NOT EXISTS clientes(
	id_cliente INT NOT NULL AUTO_INCREMENT,
	cpf_cliente VARCHAR (20) NOT NULL UNIQUE,
	nome_cliente VARCHAR (50) NOT NULL,
	PRIMARY KEY (id_cliente)
);

-- cria tabela de fornecedores (fornecedor não tem FK)
CREATE TABLE IF NOT EXISTS fornecedores(
	id_forn INT NOT NULL AUTO_INCREMENT,
	cnpj_forn VARCHAR (20) NOT NULL UNIQUE,
	nome_forn VARCHAR (50) NOT NULL,
	PRIMARY KEY (id_forn)
);

-- cria tabela de produtos (produto tem relação com fornecedor, tem FK)
CREATE TABLE IF NOT EXISTS produtos(
	id_prod INT NOT NULL AUTO_INCREMENT,
	categoria_prod VARCHAR (30) NOT NULL,
	desc_prod VARCHAR (30) NOT NULL,
	valor_prod FLOAT NOT NULL,
	fornecedor_prod INT NOT NULL,
	quantidade_prod INT NOT NULL,
	PRIMARY KEY (id_prod),
	FOREIGN KEY (fornecedor_prod) REFERENCES fornecedores(id_forn) 
);

-- cria tabela de vendas (vendas tem relação com produto e com cliente, tem FK)
CREATE TABLE IF NOT EXISTS vendas(
	id_venda INT NOT NULL AUTO_INCREMENT,
	valor_venda FLOAT NOT NULL,
	cliente_venda INT NOT NULL,
	produto_venda INT NOT NULL,
	quantidade_venda INT NOT NULL,
	PRIMARY KEY (id_venda),
	FOREIGN KEY (cliente_venda) REFERENCES clientes(id_cliente),
	FOREIGN KEY (produto_venda) REFERENCES produtos(id_prod) 
);

-- insere fornecedores

INSERT INTO fornecedores (cnpj_forn, nome_forn) VALUES (111111111111, "Fornecedor 1");
INSERT INTO fornecedores (cnpj_forn, nome_forn) VALUES (222222222222, "Fornecedor 2");
INSERT INTO fornecedores (cnpj_forn, nome_forn) VALUES (333333333333, "Fornecedor 3");
INSERT INTO fornecedores (cnpj_forn, nome_forn) VALUES (444444444444, "Fornecedor 4");
INSERT INTO fornecedores (cnpj_forn, nome_forn) VALUES (555555555555, "Fornecedor 5");

-- insere clientes
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312312, "Maria da Silva");
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312313, "João da Silva");
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312314, "José da Silva");
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312315, "Carlos da Silva");
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312316, "Jeronimo da Silva");
INSERT INTO clientes (cpf_cliente, nome_cliente) VALUES (12312312317, "Meire da Silva");

--

