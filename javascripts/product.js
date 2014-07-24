jQuery(document).ready(function() {
  add_image_handlers()
});
var add_image_handlers = function() {
  $("#main-image").data("selectedThumb", $("#main-image img").attr("src"));
  $("ul.thumbnails li").eq(0).addClass("selected");
  $("ul.thumbnails li a").click(function(e) {
    change_image(this);
    e.preventDefault();
  }).hover(function() {
    // hover in
    var e = $(this).attr("href").replace("mini", "product");
    $("#main-image img").attr("src", e);
    $("#main-image a").attr("href", e.replace("/product/", "/original/"));
    change_image(this);
  }, function() {
    // hover out
  })
};
change_image = function(object) {
  $("#main-image").data("selectedThumb", $(object).attr("href"));
  $("ul.thumbnails li").removeClass("selected");
  $(object).parent("li").addClass("selected");
  reload_cloud_zoom();
};
reload_cloud_zoom = function() {
  //console.log("reload_cloud_zoom");
  //console.log("cloud-zoom length: " + $(".cloud-zoom").length);
  //console.log("cloud-zoom-gallery length: " + $(".cloud-zoom-gallery").length);
  if($(".cloud-zoom").length > 0){
    $(".cloud-zoom").CloudZoom();
  }
  if($(".cloud-zoom-gallery").length > 0){
    $(".cloud-zoom-gallery").CloudZoom();
  }
};
