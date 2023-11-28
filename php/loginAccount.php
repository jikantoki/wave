<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定

if (
  !isset($_SERVER['HTTP_ID']) ||
  !isset($_SERVER['HTTP_PASSWORD']) ||
  !isset($_SERVER['HTTP_TOKEN']) ||
  $_SERVER['HTTP_TOKEN'] === ''
) {
  echo json_encode([
    'status' => 'invalid',
    'reason' => 'invalid authentication information',
    'errCode' => 10
  ]);
  exit;
}

$id = $_SERVER['HTTP_ID'];
$password = $_SERVER['HTTP_PASSWORD'];
$otp = $_SERVER['HTTP_TOKEN'];
$token = createUserToken($id, $password, $otp);
if ($token) {
  echo json_encode([
    'status' => 'ok',
    'reason' => 'Thank you!',
    'token' => $token,
    'id' => $id
  ]);
  $secretId = idToSecretId($id);
  $mailAddress = secretIdToMailAddress($secretId);
  sendMail($mailAddress, 'ログインがあったよ！', '<h1>ハッハッハあああ</h1><p>本文</p>');
  SQLupdate('user_secret_list', 'otp', null, 'secretId', $secretId);
} else {
  echo json_encode([
    'status' => 'ng',
    'reason' => 'Unknown user',
    'errCode' => 20
  ]);
}
