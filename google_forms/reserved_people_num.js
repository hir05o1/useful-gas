/**
 * 予約席数をカウントしてそれが一定数以上になると予約受付を終了する。
 * 実装の仕様上、予約席数+SEAT_LIMIT-1が上限になる。
 * 再びオープンにするときは手動でフォームの回答受付を再開する。
 *
 * エラーを防ぐために予約座席数を質問している問題のバリデーションをintにしておくこと。
 *
 */
function onSubmit(e) {
  const form = e.source;
  const reservedSeatsQuestionNum = 1; // 予約席数を質問している問題が何番目か
  const SEAT_LIMIT = 10; // 予約席数の上限
  let reservedSeats = 0;

  for (const response of form.getResponses()) {
    const number = parseInt(response.getItemResponses()[reservedSeatsQuestionNum].getResponse());
    reservedSeats += number;
  }

  if (reservedSeats < SEAT_LIMIT) {
    form.setAcceptingResponses(true);
    console.log("予約数: " + reservedSeats);
  } else {
    form.setAcceptingResponses(false);
    console.log("予約数が上限に達しました。予約受け付けを終了します。");
    console.log("予約数: " + reservedSeats);
  }
}
