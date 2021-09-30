//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]

String.prototype.extenso = function(c){
	var ex = [
		["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
		["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
		["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
		["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
	];
	var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
	for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
		j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
		if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
		for(a = -1, l = v.length; ++a < l; t = ""){
			if(!(i = v[a] * 1)) continue;
			i % 100 < 20 && (t += ex[0][i % 100]) ||
			i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
			s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
			((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ães") : ex[3][t]) : ""));
		}
		a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
		a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
	}
	return r.join(e);
}
//Fim do codigo de Terceiros--



//Tela de Campos, Tela de impressão
const screen          = document.querySelector("form")
const printer         = document.querySelector("main")
//Campos Digitaveis  
const clientField     = document.querySelector("#clientField")
const numField        = document.querySelector("#numField")
const refTextField    = document.querySelector("#refTextField")
const todayCheckbox	  = document.querySelector("#todayCheckbox")
const dateField		  = document.querySelector("#dateField")
//Botões
const buttonRender    = document.querySelector("#render")
const buttonCreateNew = document.querySelector("#createNew")
const buttonPrint     = document.querySelector("#print")
//Tags que receberão os dados ao renderizar
const clientWrite     = document.querySelector("#clientWrite")
const refTextWrite    = document.querySelector("#refTextWrite")
const numExtWrite     = document.querySelector("#numExtWrite")
const numWrite        = document.querySelector("#numWrite")
const dateWrite       = document.querySelector("#dateWrite")
const signatureWrite = document.querySelector("#signatureWrite")
//Botões de --Imprimir-- e --Criar Novo-- da tela renderizada
buttonCreateNew.addEventListener("click", ()=>{
	window.location.reload()})
buttonPrint.addEventListener("click", ()=>{
		window.print()})

//Função para escrever os dados tratados nas tags
function writeInTag(tagLoad,tagTarget) {
	let text = document.createTextNode(tagLoad)
	tagTarget.appendChild(text)
}

//Habilita o campo de DATA para entrada manual
todayCheckbox.addEventListener("change", ()=>{
	if (todayCheckbox.checked){
		dateField.disabled = true
	} else {
		dateField.disabled = false
	}
})

//Data de hoje Automática 
const today           = new Date()
const monthExt        = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
var date 
		
//Ação do botão --Gerar Recibo-- da tela de Campos
buttonRender.addEventListener("click", (event)=>{
	event.preventDefault()

	//Campo de data
	if (todayCheckbox.checked){
		date = `Fortaleza, ${today.getDate()} de ${monthExt[today.getMonth()]} de ${today.getFullYear()}`
	} else {
		date = dateField.value.split("-")
		date[0] = parseInt(date[0], 10) //Ano YYYY
		date[1] = parseInt(date[1], 10) //Mês MM
		date[2] = parseInt(date[2], 10) //Dia DD
		date = `Fortaleza, ${date[2]} de ${monthExt[--date[1]]} de ${date[0]}`
	}
	//Assinatura Variavel
	var signature = document.querySelector("input[name=signature]:checked")
	if (signature == null){
			signatureWrite.src = ""
			console.log(signature)
	} else {
		signatureWrite.src = `./img/signature${signature.value}.jpg`
		console.log(signature)
	}
	//Remove epaços do do inicio/fim da string
	var client = clientField.value.trim()
	var refText = refTextField.value.trim()
	var num = numField.value.trim()
	
	//trata e converte o valor para extenso
	num = num.replace(".", ",")
	var numExt = num.extenso(currency = true)
	num = "R$ " + num

	writeInTag(client, clientWrite)	
	writeInTag(refText, refTextWrite)
	writeInTag(num, numWrite)
	writeInTag(numExt, numExtWrite)
	writeInTag(date, dateWrite)
	
	screen.classList.add("off")
	printer.classList.remove("off")
})