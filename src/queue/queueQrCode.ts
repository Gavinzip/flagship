export async function generateQueueQrCodeDataUrl(targetUrl: string) {
  const { default: QRCode } = await import("qrcode");

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
