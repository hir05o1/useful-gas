function getResponseNum() {
  const SEAT_LIMIT = 8;
  const form = FormApp.getActiveForm();
  const responseNum = form.getResponses().length;

  if (responseNum < SEAT_LIMIT) {
    form.setAcceptingResponses(true);
  } else if (responseNum === SEAT_LIMIT) {
    form.setAcceptingResponses(false);
    // Discordなどに通知する処理
  } else {
    form.setAcceptingResponses(false);
  }
}
