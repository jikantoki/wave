<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定

if (
  !isset($_SERVER['HTTP_ID'])
) {
  echo json_encode([
    'status' => 'invalid',
    'reason' => 'invalid authentication information',
    'errCode' => 10
  ]);
  exit;
}

$id = $_SERVER['HTTP_ID'];
$res = getProfile($id);
if ($res) {
  echo json_encode([
    'status' => 'ok',
    'reason' => 'Thank you!',
    'res' => $res,
    'id' => $id
  ]);
} else {
  echo json_encode([
    'status' => 'ng',
    'reason' => 'Unknown user',
    'id' => $id,
    'errCode' => 20
  ]);
}
