import "jquery";
import "bootstrap";
import "owl.carousel";
import "../assets/js/imagesloaded.js";

const WOW = require("wowjs");
window.wow = new WOW.WOW({ live: false });

wow.init();

require("../assets/js/custom.js");
