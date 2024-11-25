// GETメソッドに対応する関数
function doGet (e) {
  const payload = JSON.stringify({
    method: "GET",
    message: "doGet関数が呼ばれました",
  });
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}

// POSTメソッドに対応する関数
function doPost(e) {
  const payload = JSON.stringify({
    method: "POST",
    message: "doPost関数が呼ばれました",
  });
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}
