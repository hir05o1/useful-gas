// 日時トリガーを設定して閉じる
function endForm() {
  const form = FormApp.getActiveForm();
  form.setAcceptingResponses(false);
}
