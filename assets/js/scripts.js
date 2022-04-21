
$(".search").on("click", function () {
  var city = $(this).parent(".btnPar").siblings(".textVal").val();
  localStorage.setItem("city", city);
});
