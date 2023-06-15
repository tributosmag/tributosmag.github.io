const description = document.querySelector(".tooltip");

		document.querySelectorAll('path').forEach((el) =>
			el.addEventListener('mouseover', (event) => {
				event.target.className = ("enabled");
				description.classList.add("active");
				description.innerHTML = event.target.id;
			})

		);

		document.querySelectorAll('path').forEach((el) =>
			el.addEventListener("mouseout", () => {
				description.classList.remove("active");
			})
		);

		document.onmousemove = function (e) {
			description.style.left = e.pageX + "px";
			description.style.top = (e.pageY - 70) + "px";
		}

$(document).ready(function() {
  $("a.botao-estado").click(function(event) {
    event.preventDefault();
    var tabela = $(this).data("tabela");
    $(".tabela-estados").hide();
    $("#" + tabela).show();
  });

  $("path").click(function(event) {
    event.preventDefault();
    var tabela = $(this).data("tabela");
    $(".tabela-estados").hide();
    $("#" + tabela).show();
  });


  // Registra cliques
  $(document).on("click", ".tabela-estados tr", function() {
    $(this).toggleClass("selecionado");
  });
});

$(document).ready(function() {
  $(".botao-estado").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");

    // Oculta o mapa e as tabelas
    $("svg").hide();
    $(".tabela-estados").hide();

    // Move a tabela correspondente para o novo local
    $("#" + tabelaId).appendTo("#container").show();
  });

  $("path").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");

    // Oculta o mapa e as tabelas
    $("svg").hide();
    $(".tabela-estados").hide();

    // Move a tabela correspondente para o novo local
    $("#" + tabelaId).appendTo("#container").show();
  });
});

$(document).ready(function() {
  $("#botao-mapa").click(function(event) {
    event.preventDefault();

    // Oculta as tabelas e mostra o mapa
    $(".tabela-estados").hide();
    $("#mapa").show();
  });

  $(".botao-estado").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");

    // Oculta o mapa e as tabelas
    $("#mapa").hide();
    $(".tabela-estados").hide();

    // Move a tabela correspondente para o novo local
    $("#" + tabelaId).appendTo("#container").show();
  });

  $("path").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");

    // Oculta o mapa e as tabelas
    $("#mapa").hide();
    $(".tabela-estados").hide();

    // Move a tabela correspondente para o novo local
    $("#" + tabelaId).appendTo("#container").show();
  });
});
