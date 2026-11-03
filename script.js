/* ============================================================
   CONSULTORIA RURAL - script.js (funcionalidades do site)
   Escrito de forma simples para funcionar também em celulares antigos.
   Índice:
   1. Configuração (número do WhatsApp)  <- EDITE AQUI
   2. Links do WhatsApp
   3. Imagem do mascote (pasta "imagens", arquivo "betta")
   ============================================================ */


/* ------------------------------------------------------------
   1. CONFIGURAÇÃO
   Número do WhatsApp: DDI + DDD + número, só dígitos.
   Exemplo: 5594912345678  (55 = Brasil, 94 = DDD, 912345678 = número)
   ------------------------------------------------------------ */
(function () {
"use strict";   // modo estrito: o código fica isolado e sem variáveis globais

var WA = "5500000000000";


/* ------------------------------------------------------------
   2. LINKS DO WHATSAPP
   Todo botão com data-msg no HTML vira um link do WhatsApp.
   A mensagem pronta é o texto escrito em data-msg.
   Para mudar uma mensagem, edite o data-msg do botão no index.html.
   ------------------------------------------------------------ */
var botoes = document.querySelectorAll("[data-msg]");
if (/^[0-9]{10,15}$/.test(WA)) {   // só aceita número com dígitos (evita link quebrado ou malicioso)
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(botoes[i].getAttribute("data-msg"));
    botoes[i].target = "_blank";   // abre o aplicativo / outra aba
    botoes[i].rel = "noopener noreferrer";   // a outra aba não controla nem enxerga este site
  }
}


/* ------------------------------------------------------------
   3. IMAGEM DO MASCOTE (pasta "imagens", arquivo "betta")
   O caminho está no index.html: <img src="imagens/betta.png">.
   Se o arquivo tiver outra terminação (.webp, .jpg, .jpeg),
   o site tenta cada uma sozinho. Se nenhuma existir, aparece
   o espaço reservado (círculo tracejado).
   Dica: mantenha o nome em letras minúsculas: betta.png
   ------------------------------------------------------------ */
var EXTENSOES = ["png", "webp", "jpg", "jpeg", "PNG", "JPG"];

function imagemFalhou(img) {
  var pai = img.parentNode;
  if (pai.className.indexOf("mascot") > -1) pai.className += " empty";
  pai.removeChild(img);
}

function tentarProxima(img) {
  var base = img.getAttribute("data-base");
  if (!base) {   // guarda o caminho sem a terminação: imagens/betta
    base = img.getAttribute("src").replace(/\.[^.\/]+$/, "");
    img.setAttribute("data-base", base);
  }
  if (/^([a-z][a-z0-9+.\-]*:|\/\/)/i.test(base)) { imagemFalhou(img); return; }   // só imagens do próprio site
  var n = parseInt(img.getAttribute("data-n") || "0", 10) + 1;
  if (n < EXTENSOES.length) {
    img.setAttribute("data-n", n);
    img.src = base + "." + EXTENSOES[n];
  } else {
    imagemFalhou(img);
  }
}

var imagens = document.querySelectorAll("img");
for (var k = 0; k < imagens.length; k++) {
  (function (img) {
    img.addEventListener("error", function () { tentarProxima(img); });
    if (img.complete && !img.naturalWidth) tentarProxima(img);
  })(imagens[k]);
}
})();
