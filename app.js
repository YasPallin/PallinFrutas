var express = require("express");
const app = express();
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user",
  database: "mercado",
});

const port = 8000;
app.set("view engine", "ejs"); 
app.set("views", __dirname,"/views"); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(express.static("public"));

// rota para página inicial - index
app.get("/", (req, res) =>{ 
	res.render("views/pages/index"); 
});

// rota para listar os produtos
app.get("/produtos", (req, res) =>{
	var listar_produtos = "SELECT * FROM produtos"
	con.query(listar_produtos, function (err, result) {
		if (err) throw err;
		res.render("views/pages/produtos", {produtosLista: result});
	});
});

// rota para listar o estoque
app.get("/estoque", (req, res) =>{
	var listar_produtos = "SELECT * FROM produtos"
	con.query(listar_produtos, function (err, result) {
		if (err) throw err;
		res.render("views/pages/estoque", {produtosLista: result});
	});
});


// rota para cadastrar produtos
app.get("/cadastrarProduto", (req, res) =>{
	res.render("views/pages/formCadastraproduto");
});

app.post("/cadastrarProduto", (req, res)=>{ 
	let produtoCat = req.body.categoria;
    let produtoDesc = req.body.descricao;
    let produtoValor = req.body.valor;
    let produtoFornecedor = req.body.fornecedor;
	let produtoQuantidade = req.body.quantidade_estoque;

	var sql = `INSERT INTO produtos (categoria_prod, desc_prod, valor_prod, fornecedor_prod, quantidade_prod) VALUES ('${produtoCat}', '${produtoDesc}', '${produtoValor}', ${produtoFornecedor}, ${produtoQuantidade})`;
	con.query(sql, function (err, result){
		resultado = result;
		console.log(resultado);
		if (err) throw err;
		console.log("dado inserido " + sql);
		res.redirect("/produtos")
	});	
});

// rota para editar produtos
app.get("/editarProduto/:id", (req, res)=>{
	var edita_sql = `SELECT * FROM produtos WHERE id_prod = ${req.params.id}`;
	con.query(edita_sql, function (err, result){
		if (err) throw err;
		res.render("views/pages/formEditaProduto", {produtosItens:result[0]});
	});
});

app.post("/editarProduto", (req, res)=>{
	let produtoCat = req.body.categoria;
    let produtoDesc = req.body.descricao;
    let produtoValor = req.body.valor;
    let produtoFornecedor = req.body.fornecedor;
	let produtoQuantidade = req.body.quantidade;

	var sql_edita = `UPDATE produtos SET categoria_prod = '${produtoCat}', desc_prod = '${produtoDesc}', valor_prod = '${produtoValor}', fornecedor_prod = ${produtoFornecedor}, quantidade_prod = ${produtoQuantidade} WHERE id_prod =  ${req.body.id}`;
	con.query(sql_edita, function (err, result){
		if (err) throw err;
		res.redirect("/produtos")
	});
});

// rota para deletar produtos
app.get("/deletarproduto/:id", (req, res) =>{
	var sql_delete = `DELETE FROM produtos WHERE id_prod = ${req.params.id}`;
	con.query(sql_delete, function (err, result){
		resultado = result;
		console.log(resultado);
		if (err) throw err;
		res.redirect("/produtos");
	});
});

// rota para pesquisar
app.get("/pesquisar", (req, res)=>{
	let buscaCat = req.query.pesquisa;
    let buscaDesc = req.query.pesquisa;
    let buscaFornecedor = req.query.pesquisa;

	var sql_pesquisa = `SELECT * FROM produtos WHERE categoria_prod = '${buscaCat}' OR desc_prod = '${buscaDesc}' OR fornecedor_prod = '${buscaFornecedor}'`;
	con.query(sql_pesquisa, function (err, result){
		if (err) throw err;
		res.render("views/pages/produtos", {produtosLista: result});
	});
});

// rota para inserir vendas
app.get("/cadastrarVenda", (req, res) =>{

	var sql_cliente = `SELECT * FROM clientes`;
	var sql_produto = `SELECT * FROM produtos`;

	con.query(sql_cliente, function(err, result_cliente){
		if (err) throw err;
		con.query(sql_produto, function(err, result_produto){
			if (err) throw err;
			res.render("views/pages/formCadastraVenda", {clientesLista: result_cliente, produtosLista: result_produto});
		});
	});
});

app.post("/cadastrarVenda", (req, res)=>{ 
	let vendaValor = req.body.valor_venda;
    let vendaCliente = req.body.cliente_venda;
    let vendaProduto = req.body.produto_venda;
	let vendaQtnd = req.body.quantidade_venda;

	var sql_venda = `INSERT INTO vendas (valor_venda, cliente_venda, produto_venda, quantidade_venda) VALUES (${vendaValor}, ${vendaCliente}, ${vendaProduto}, ${vendaQtnd})`;
	// para atualizar estoque 
	var sql_edita_estoque = `UPDATE produtos SET quantidade_prod = quantidade_prod - ${vendaQtnd} WHERE id_prod =  ${vendaProduto}`;

	con.query(sql_venda, function (err, result){
		if (err) throw err;
		con.query(sql_edita_estoque, function(err, result){
			if (err) throw err;
			res.redirect("/vendas");
		});
	});	
});

// rota para listar as vendas
app.get("/vendas", (req, res) =>{
	var listar_vendas = "SELECT * FROM vendas JOIN clientes ON vendas.cliente_venda = clientes.id_cliente JOIN produtos ON vendas.produto_venda = produtos.id_prod"
	con.query(listar_vendas, function (err, result) {
		if (err) throw err;
		res.render("views/pages/vendas", {vendasLista: result});
	});
});

// porta
app.listen(port, () =>{ 
	console.log("Servidor rodando na porta " + port); 
});
