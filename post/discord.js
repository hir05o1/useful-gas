function postDiscord(text, displayName, pictureUrl) {
  const WEBHOOK_URL = "";
  const payload = {
    username: `${displayName}`,
    avatar_url: pictureUrl,
    content: text,
  };
  const options = {
    method: "post",
    payload: JSON.stringify(payload),
  };
  const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
  console.log("Discordにpostしました\n" + response.getResponseCode() + "\n" + response.getContentText());
}
