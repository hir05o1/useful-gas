function doGet(e) {
  const form = e.source;
  const output = {};
  output.name = form.getTitle();
  if (form.isAcceptingResponses()) {
    output.isAllReserved = false;
  } else {
    output.isAllReserved = true;
  }
  console.log(output);
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
