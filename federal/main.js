$(document).ready(function() {
  // Código do menu mobile
  $(".sub-btn").click(function() {
    $(this).next(".sub-menu").slideToggle();
  });

  $(".more-btn").click(function() {
    $(this).next(".more-menu").slideToggle();
  });

  var menu = $(".menu");
  var menuBtn = $(".menu-btn");
  var closeBtn = $(".close-btn");

  menuBtn.click(function() {
    menu.addClass("active");
    $(".search-box").addClass("active"); // Adiciona a classe "active" à barra de pesquisa
  });

  closeBtn.click(function() {
    menu.removeClass("active");
    $(".search-box").removeClass("active"); // Remove a classe "active" da barra de pesquisa
  });

  $(window).scroll(function() {
    var nav = $("nav");
    nav.toggleClass("sticky", $(this).scrollTop() > 0);
  });

  $(".menu .menu-item").click(function() {
    var tabela = $(this).find("a").data("tabela");
    $(".tabela-menu").hide();
    $("#" + tabela).show();
    showRows();
  });

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

  function hasKeywordsInCells(keywords, cells) {
    let hasKeyword = false;
    keywords.forEach(function(keyword) {
      cells.each(function() {
        const text = $(this).text().toLowerCase();
        if (text.includes(keyword)) {
          hasKeyword = true;
          return false;
        }
      });
      if (hasKeyword) {
        return false;
      }
    });
    return hasKeyword;
  }

  function showRows() {
    let rows = $("tbody tr");
    rows.each(function() {
      let shouldShowRow = true;
      let row = $(this);
      if (shouldShowRow) {
        row.show();
      } else {
        row.hide();
      }
    });
  }

  function search() {
    const keywords = $("#search-input").val().toLowerCase().split(" ");
    const visibleTables = $(".tabela-menu:visible");

    $(".tabela-menu tr").show();

    visibleTables.each(function() {
      const rows = $(this).find("tbody tr");
      rows.each(function(index) {
        const cells = $(this).find("td");
        const hasAllKeywords = hasKeywordsInCells(keywords, cells);
        const hasAnyKeyword = hasKeywordsInCells(keywords, cells);
        $(this).toggle(hasAllKeywords || hasAnyKeyword);
        $(this).attr("data-incidencia", hasAllKeywords ? countKeywordsInCells(keywords, cells) : 0);
      });

      $(this)
        .find("tbody tr:visible")
        .sort(function(a, b) {
          var countA = parseInt($(a).attr("data-incidencia"));
          var countB = parseInt($(b).attr("data-incidencia"));
          return countB - countA;
        })
        .appendTo($(this).find("tbody"));
    });

    $("#search-input").val("");
  }

  $("#search-input").keydown(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      search();
    }
  });

  $(".search-btn").click(function(event) {
    event.preventDefault();
    search();
  });
});

