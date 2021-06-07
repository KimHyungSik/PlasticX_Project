const host = "13.59.10.162";
for (let i = 0; i < 10; i++) {
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: host + `/${i}`,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
$("#qrcode > img").css({ margin: "auto" });
