<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定

$res = SQL('select * from USER_POST_VIEW;');
echo json_encode([
  'status' => 'ok',
  'reason' => 'thank you!',
  'res' => $res
]);
