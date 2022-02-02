// função para aparecer a setinha para o topo

$(document).ready(function(){
	verifica_posicao_topo();
	$(window).scroll(function(){
		verifica_posicao_topo();
	});
	$("#seta_topo").click(function(){
		$("html").animate({scrollTop: 0}, 1000);
	});
});

function verifica_posicao_topo(){
	console.log($(window).scrollTop())
	if ($(window).scrollTop() > 400){
		$("#seta_topo").fadeIn();
	} else {
		$("#seta_topo").fadeOut();
	}
}

// Chama as funções para validar formulário de cadastro da página minha conta - cadastro
$(document).ready(function () {
	$("#descricao").blur(valida_campo_letras);

})

// função para habilitar o botão de enviar cadastro
function habilitar_botao(){
	if (retorna_valor_letras($("#descricao"))){
		$("#btnCadastrar").removeAttr("disabled");
	} else {
		$("#btnCadastrar").attr("disabled", "disabled");
	}
}

// função para verificar campo de letras

function valida_campo_letras(){ 
	var validacao_temporaria = retorna_valor_letras($(this));	
	if (validacao_temporaria == false){
		$(this).css({border: "solid lightpink 2px"});
	} else {
		$(this).css({border: "solid lightgreen 2px"});
	}
	habilitar_botao();
}

function retorna_valor_letras(input){ 
	var campo_valor = input.val();
	var validacao_temporaria = campo_valor.length > 0; 
	for (i = 0; i < campo_valor.length; i++){ 
		if (!isNaN(campo_valor[i]) && campo_valor[i] != " "){
			validacao_temporaria = false;
		}		
	}
	return validacao_temporaria; 
}



