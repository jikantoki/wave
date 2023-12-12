<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定

if (!isset($_SERVER['HTTP_POSTID'])) {
  echo json_encode([
    'status' => 'invalid',
    'reason' => 'invalid postId',
    'errCode' => 10
  ]);
  exit;
}
$postId = $_SERVER['HTTP_POSTID'];
$res = getPost($postId);
if ($res) {
  echo json_encode([
    'status' => 'ok',
    'reason' => 'thank you!',
    'res' => $res
  ]);
} else {
  echo json_encode([
    'status' => 'unknown',
    'reason' => 'not found',
    'errCode' => 404
  ]);
}
