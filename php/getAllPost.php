<?php
require_once '../env.php'; //環境変数読み込み
require_once './settings.php'; //ルートディレクトリ読み込み
require_once DIR_ROOT . '/php/myAutoLoad.php'; //自動読み込み
require_once DIR_ROOT . '/php/functions/authAPIforUse.php'; //APIが有効かどうか自動判定

$res = SQLfetchAll('select * from USER_POST_VIEW where isSecret=0 order by postCreatedAt desc;');
echo json_encode([
  'status' => 'ok',
  'reason' => 'thank you!',
  'res' => $res
]);
