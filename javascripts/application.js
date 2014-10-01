window.I18n||(I18n={}),I18n.defaultLocale="es",I18n.translations={en:{"delete":"Delete",edit:"Edit",actions:{},are_you_sure:"Are you sure?",item_total:"Item Total",no_shipping_methods_available:"No shipping methods available, please change your address and try again.",order_total:"Order Total",pay:"pay",resource_controller:{},shipment:"Shipment"},es:{"delete":"Eliminar",edit:"Editar",resource_controller:{error:"\xa1Hubo un error!"},hide:"Ocultar",actions:{destroying:"Eliminando"},are_you_sure:"\xbfEst\xe1s seguro?",are_you_sure_product_update:"Esto actualizar\xe1 el precio de las variantes \xbfEst\xe1 seguro que quiere continuar?",item_total:"Total de art\xedculos",no_shipping_methods_available:"Lamentablemente no hacemos env\xedos a ",order_total:"Total del pedido",pay:"Pagar",payment_method:{loading:"Cargando medios de pago"},processing:"Procesando",shipment:"Env\xedo",shipment_included:"Env\xedo Inclu\xeddo",your_area:"tu area"},date:{}},function(){function t(t,e){return t.replace(r,function(){return"undefined"==typeof e[arguments[1]]?arguments[0]:e[arguments[1]]})}function e(t){return t?"string"!=typeof t?t:t.split("."):[]}function n(){return I18n.locale||I18n.defaultLocale}function a(){var t,e,n,a=document.cookie.split(/\s*;\s*/);for(t=0;t<a.length;t++)if(e=a[t].split("="),"locale"===e[0]){n=e[1];break}return n}var r=/%\{([^}]+)\}/g;I18n.init=function(){this.locale=a()},I18n.translate=function(n,a){if("string"!=typeof n){var r,i=[];for(r=0;r<n.length;r++)i.push(this.translate(n[r],a));return i}a=a||{},a.defaultValue=a.defaultValue||null,n=e(a.scope).concat(e(n));var o=this.lookup(n,a.defaultValue);return"string"!=typeof o&&o&&(o=this.pluralize(o,a.count)),"string"==typeof o&&(o=t(o,a)),o},I18n.t=I18n.translate,I18n.lookup=function(t,a){var r=0,i=this.translations[n()];for(a="string"==typeof a?[a]:a||[];t[r];)i=i&&i[t[r]],r++;return i?i:0==a.length?null:":"==a[0].substr(0,1)?this.lookup(t.slice(0,t.length-1).concat(e(a[0].substr(1))),a.slice(1)):a[0]},I18n.pluralize=function(t,e){return"number"!=typeof e?t:1==e?t.one:t.other}}(),I18n.init(),$=jQuery,$(document).ready(function(){function t(t){return confirm(I18n.t("are_you_sure"))?($("#delete_"+t+"_button").click(),!0):!1}function e(e,n){var a=$("<img />").attr("src","/assets/admin/icons/loadera16.gif").attr("width","16").attr("height","16"),r=n.attr("data-id");t(r)&&(n.unbind("click"),n.click(function(t){t.preventDefault()}),n.parent().children('img[alt="Delete"]').remove(),n.html(I18n.t("actions.destroying")),n.prepend(" ").prepend(a),n.addClass("currently-in-action")),e.preventDefault()}I18n.locale="es",$("a.disabled").click(function(){return!1}),$("form#updatecart a.delete").show().click(function(){return $(this).parents("tr").find("input.line_item_quantity").val(0),$(this).parents("form").submit(),!1}),$("a.delete_entity").click(function(t){e(t,$(this))});var n=!1;$("body.admin #content div.form-data div.advanced").hide(),$("body.admin #content a#more-details").click(function(){return 0==n?(n=!0,$("body.admin #content div.form-data div.advanced").animate({height:"show"},600),$(this).text("Ocultar detalles..."),$("html,body").animate({scrollTop:$("#more-details").offset().top},1e3)):(n=!1,$("body.admin #content div.form-data div.advanced").animate({height:"hide"},600),$(this).text("Mostrar m\xe1s detalles...")),!1}),$("table.index tr:odd").addClass("odd"),$("table.index tr:even").addClass("even"),$(".tips form select#facebook_page").change(function(){var t=$(this).find(":selected").html();$(".tips form input#facebook_page_name").attr("value",t)}),$("#cart-edit a#checkout").bind("click",function(){return $("form#updatecart #order_redirect_to").attr("value","/checkout"),$("form#updatecart").submit(),!0}),$("#cart-edit #cart_update").bind("click",function(){return $("form#updatecart").submit(),!1})}),$=jQuery,$(document).ready(function(){$("#partners-mail-list-form form").bind("ajax:success",function(t,e){$("#partners-mail-list-form").replaceWith(e)}),$("#partners-mail-list-form form").bind("ajax:failure",function(t,e){$("#partners-mail-list-form div.error").removeClass("hidden"),$("#partners-mail-list-form div.error").html(e.response)})});

$(document).ready(function(){
  // first time check
  checkSelected();
  // on change check
  $("#product-variants select").change(function(e){
    checkSelected();
  });
});

function checkSelected() {
  var selected_names = new Array();
  $("#product-variants select option:selected").each(function(){
    selected_names.push($(this).text());
  });
  selected_names.sort();
  // look in each variant
  for(var i=0; i<window.product_variants.length; i++) {
    var possible_names = new Array();
    for(var j=0; j<window.product_variants[i].option_values.length; j++){
      possible_names.push(window.product_variants[i].option_values[j].name);
    }
    possible_names.sort();
    var are_identical = false;
    for(var k=0; k<possible_names.length; k++) {
      if(possible_names[k] == selected_names[k]){
        are_identical = true;
      } else {
        are_identical = false;
        // one's not the same, break loop
        break;
      }
    }
    if(are_identical){
      changePrice(window.product_variants[i].price);
      changeImage(window.product_variants[i].image);
    }
  }
}

function changePrice(price){
  if(price != undefined && price != "") {
    $("span.price").html("$"+Math.floor(price));
  }
}

function changeImage(image_url){
  //console.log("changeImage");
  if(image_url != undefined && image_url != "") {
    //console.log(image_url);

    var image_url_important = image_url.split("/");
    image_url_important = image_url_important[image_url_important.length-1];
    image_url_important = image_url_important.split("?");
    image_url_important = image_url_important[0];

    var $image_to_select;

    $('ul.thumbnails li').each(function(){
      if(stringContains($("img", this).attr("src"), image_url_important)) {
        $image_to_select = $("img", this);
      }
    });

    if($image_to_select != undefined) {
      //console.log($image_to_select);

      // prerarar la URL:
      var image_url_large = $image_to_select.closest("a").attr('href').replace('/mini/', '/large/');
      // change product image:
      $('#main-image img').attr('src', image_url_large);
      // change BIG image:
      var image_url_original = image_url_large.replace('/large/', '/original/').replace('/product/', '/original/');
      $('#main-image a').attr('href', image_url_original);
      // save new current main image:
      $("#main-image").data('selectedThumb', $image_to_select.closest("a").attr('href'));

      // remove selected class from every li:
      $('ul.thumbnails li').removeClass('selected');
      // mark selected one as selected:
      $image_to_select.closest('li').addClass('selected');
      // reload:
      reload_cloud_zoom();
    }
  }
}

function stringContains(baseString, contains){
  if(baseString.indexOf(contains) != -1) {
    return true;
  } else {
    return false;
  }
}
