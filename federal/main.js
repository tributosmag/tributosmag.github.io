  $("menu li").click(function() {
    var tabela = $(this).attr("data-tabela");
    $(".tabela-menu").hide(); // Oculta todas as tabelas
    $("#" + tabela).show(); // Exibe a tabela correspondente ao item do menu
    showRows(); // Atualiza a exibição das linhas
  });  

  // Registra cliques
  $(document).on("click", ".tabela-menu tr", function() {
    $(this).toggleClass("selecionado");
  });

  // Incidência: Melhores resultados
  function countKeywordsInCells(keywords, cells) {
    let count = 0;
    keywords.forEach(function(keyword) {
      cells.each(function() {
        const text = $(this).text().toLowerCase();
        if (text.includes(keyword)) {
          count++;
        }
      });
    });
    return count;
  }

  // Verifica se a linha contém pelo menos uma das palavras-chave
function hasKeywordsInCells(keywords, cells) {
  let hasKeyword = false;
  keywords.forEach(function(keyword) {
    cells.each(function() {
      const text = $(this).text().toLowerCase();
      if (text.includes(keyword)) {
        hasKeyword = true;
        return false; // Encerra o loop de células para a palavra-chave atual
      }
    });
    if (hasKeyword) {
      return false; // Encerra o loop de palavras-chaves se já foi encontrada uma correspondência
    }
  });
  return hasKeyword;
}
function showRows() {
  let inputValues = getValuesFromInputs();
  let rows = document.querySelectorAll("tbody tr");
  for (let row of rows) {
    let shouldShowRow = true;
    if (inputValues.length > 0) {
      shouldShowRow = false;
      for (let value of inputValues) {
        if (row.textContent.toLowerCase().includes(value.toLowerCase())) {
          shouldShowRow = true;
          break;
        }
      }
    }
    if (shouldShowRow) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

document.querySelector("#search-input").addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    search();
    event.preventDefault();
  }
});

$(".search-btn").click(function() {
  search();
});

function search() {
  const keywords = $("#search-input").val().toLowerCase().split(' ');
  const visibleTables = $(".tabela-menu:visible");

  $(".tabela-menu tr").show();

  visibleTables.each(function() {
    const rows = $(this).find('tbody tr');
    rows.each(function(index) {
      const cells = $(this).find('td');
      const hasAllKeywords = hasKeywordsInCells(keywords, cells);
      const hasAnyKeyword = hasKeywordsInCells(keywords, cells);
      $(this).toggle(hasAllKeywords || hasAnyKeyword);
      $(this).attr('data-incidencia', hasAllKeywords ? countKeywordsInCells(keywords, cells) : 0);
    });

    $(this)
      .find('tbody tr:visible')
      .sort(function(a, b) {
        var countA = parseInt($(a).attr('data-incidencia'));
        var countB = parseInt($(b).attr('data-incidencia'));
        return countB - countA;
      })
      .appendTo($(this).find('tbody'));
  });

  $("#search-input").val("");
}