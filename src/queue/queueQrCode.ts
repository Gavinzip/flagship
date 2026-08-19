import QRCode from "qrcode";

export async function generateQueueQrCodeDataUrl(targetUrl: string) {
  return QRCode.toDataURL(targetUrl, {
    color: {
      dark: "#030910ff",
      light: "#ffffffff",
    },
    errorCorrectionLevel: "M",
    margin: 3,
    width: 720,
  });
}
