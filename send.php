<?php
// send.php

// フォームから送信されたデータを取得
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// 基本的なバリデーション
if (empty($name) || empty($email) || empty($message)) {
    echo "すべてのフィールドに入力してください。";
    exit;
}

// メール送信設定
$to = "your-email@example.com"; // 受信先のメールアドレス（ご自身のメールアドレスに変更してください）
$subject = "お問い合わせフォームからのメッセージ";
$body = "名前: $name\nメール: $email\n\nメッセージ:\n$message";
$headers = "From: $email" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// メール送信処理
if (mail($to, $subject, $body, $headers)) {
    // 送信成功の場合、サンクスページへリダイレクトするなどの処理を実施
    header("Location: thankyou.html");
    exit;
} else {
    echo "メールの送信に失敗しました。";
}
?>
