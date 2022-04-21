

var cityHist = [];
//Saves search history of city
$(".search").on("click", function () {
  var city = $(this).parent(".btnPar").siblings(".textVal").val();
  cityHist.push(city);
  emptyHist();
  getHistory();
});

//creates extra buttons based on history
var contHistEl = $(".cityHist");
function getHistory() {
  for (let i = 0; i < cityHist.length; i++) {
    var rowEl = $("<row>");
    var btnEl = $("<button>");

    rowEl.addClass("row histBtnRow");
    btnEl.addClass("btn btn-outline-secondary");
    btnEl.attr("type", "button");

    btnEl.text(`${cityHist[i]}`);

    contHistEl.append(rowEl);
    rowEl.append(btnEl);
  }
}

function emptyHist() {
  contHistEl.empty();
}
// deletes duplicates
