const CHANNEL_ACCESS_TOKEN = "";
const GROUP_ID = "";
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("chat_history");

// LINEをDiscordに転送
function doPost(e) {
  const res = e.postData.contents; // JSON
  ss.getRange(ss.getLastRow() + 1, 1, 1, 1).setValue(res);
  console.log(res);
  //記録
  const message = JSON.parse(res).events[0].message.text;
  const userId = JSON.parse(res).events[0].source.userId;
  const userInfo = getLineGroupMemberDetails(userId);
  const displayName = userInfo.displayName;
  const pictureUrl = userInfo.pictureUrl;
  postDiscord(message, displayName, pictureUrl);
}

// LINEグループにpost
function postTextToLineGroup(text) {
  const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
  const payload = {
    to: GROUP_ID,
    messages: [
      {
        type: "text",
        text: text,
      },
    ],
  };
  const options = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    method: "post",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(LINE_API_URL, options);
  console.log("Discordにpostしました。\n" + response.getResponseCode() + "\n" + response.getContentText());
}

function postDiscord(text, displayName, pictureUrl) {
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1170128616273752145/RM2zUa1jvaFJAuGrHh1xzlrs8NZK3-FhQxpE-VYq4ZSqLWbCPGSSDv7-_OyRxsoaARAx";
  const payload = {
    username: `${displayName}`,
    avatar_url: pictureUrl,
    content: text,
  };
  const options = {
    method: "post",
    payload: payload,
  };
  const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
  console.log("Discordにpostしました。\n" + response.getResponseCode() + "\n" + response.getContentText());
}

function getLineGroupMemberDetails(userId) {
  const url = "https://api.line.me/v2/bot/group/" + GROUP_ID + "/member/" + userId;
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText()); // JSON -> obj
  return result;
}
