const qrs = $(".qr-code");
const ids = $(".id-string");

for (let i = 0; i < qrs.length; ++i) {
  new QRCode(qrs[i], {
    text: ids[i].innerHTML,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
$("#qrcode > img").css({ margin: "auto" });
