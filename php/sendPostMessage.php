<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定
require_once DIR_ROOT . '/php/functions/authAccountforUse.php'; //ログイン状態が有効かどうか判定

//////////////////////////////////////////////////////

/////////    まだimageとsoundはアップロードできない！

//////////////////////////////////////////////////////

if (!isset($_POST['message'])) {
  echo json_encode([
    'status' => 'invalid',
    'reason' => 'invalid message',
    'errCode' => 10
  ]);
  exit;
}

$id = $_SERVER['HTTP_ID'];
$secretId = idToSecretId($id);
$messageSource = $_POST['message'];
$message = strip_tags(
  $messageSource,
  '<p><a><div><span><b><i><u><li><ul><table><thead><tbody><th><td><h1><h2><h3><h4><h5><h6><br><hr>'
);

if (isset($_POST['images']) && $_POST['images'] !== '') {
  $imageSource = $_POST['images'];
  $images = json_decode($imageSource);
} else {
  $images = [];
}
if (isset($_POST['sound']) && $_POST['sound'] !== '') {
  $sound = $_POST['sound'];
} else {
  $sound = null;
}
if (isset($_POST['reply']) && $_POST['reply'] !== '') {
  $reply = $_POST['reply'];
} else {
  $reply = null;
}
if (isset($_POST['quote']) && $_POST['quote'] !== '') {
  $quote = $_POST['quote'];
} else {
  $quote = null;
}
$res = postMessage($secretId, $message, $reply, $quote, $images, $sound);

echo json_encode([
  'status' => 'ok',
  'reason' => 'thank you!',
  'postId' => $res,
  'message' => $message
]);
