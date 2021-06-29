var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: document.getElementById("idString").innerHTML,
  width: 128,
  height: 128,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});
$("#qrcode > img").css({ margin: "auto" });

console.log(qrcode);
