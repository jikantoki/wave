-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2023 年 11 月 28 日 02:16
-- サーバのバージョン： 5.7.25-log
-- PHP のバージョン: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `qr4el_vuetemp`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `api_list`
--

CREATE TABLE `api_list` (
  `secretId` varchar(64) NOT NULL COMMENT 'APIの内部処理用ID',
  `apiId` text NOT NULL COMMENT '実際に使われるID',
  `apiToken` text NOT NULL COMMENT '暗号化していないト－クン',
  `apiAccessKey` text NOT NULL COMMENT 'ハッシュ化されたアクセスキー'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='API管理用';

-- --------------------------------------------------------

--
-- テーブルの構造 `api_listForView`
--

CREATE TABLE `api_listForView` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `apiName` text NOT NULL COMMENT 'APIの名前',
  `apiAuthor` text COMMENT 'APIの管理者名',
  `apiURL` text COMMENT 'API製作者が誘導に使う用URL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='api_listの表示に関する部分';

-- --------------------------------------------------------

--
-- テーブルの構造 `mail_list`
--

CREATE TABLE `mail_list` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `mailAddress` text NOT NULL COMMENT 'メアド',
  `mailAddressStatus` text COMMENT 'メアドの有効確認とか'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='メアドのリスト';

-- --------------------------------------------------------

--
-- テーブルの構造 `push_token_list`
--

CREATE TABLE `push_token_list` (
  `pushId` varchar(64) NOT NULL COMMENT 'プッシュ通知管理用ユニークID',
  `secretId` varchar(64) DEFAULT NULL COMMENT 'ユーザー特定用ID',
  `push_endPoint` text NOT NULL,
  `push_publicKey` text NOT NULL,
  `push_authToken` text NOT NULL,
  `createdAt` int(11) NOT NULL COMMENT '作られた時間のunixtime'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_accesstoken_list`
--

CREATE TABLE `user_accesstoken_list` (
  `tokenId` varchar(64) NOT NULL COMMENT 'トークン管理用ID',
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `token` text NOT NULL COMMENT 'アクセストークン',
  `createdAt` int(11) NOT NULL COMMENT 'トークン発行時間unixtime',
  `retryCount` int(11) DEFAULT NULL COMMENT 'リトライした回数',
  `lockedAt` int(11) DEFAULT NULL COMMENT 'リトライ失敗につきロックをしたUNIXTIME'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_list`
--

CREATE TABLE `user_list` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `userId` varchar(64) NOT NULL COMMENT '表示用ID',
  `createdAt` int(11) NOT NULL COMMENT '登録時間のunixtime',
  `status` text COMMENT 'ユーザーステータス'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_mail_list`
--

CREATE TABLE `user_mail_list` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `mailAddress` text NOT NULL COMMENT 'メアド',
  `status` text NOT NULL COMMENT 'メアドの有効状態',
  `token` text COMMENT 'ワンタイムトークン'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザーのメールアドレスを保存';

-- --------------------------------------------------------

--
-- ビュー用の代替構造 `USER_MAIL_VIEW`
-- (実際のビューを参照するには下にあります)
--
CREATE TABLE `USER_MAIL_VIEW` (
`secretId` varchar(64)
,`userId` varchar(64)
,`createdAt` int(11)
,`status` text
,`mailAddress` text
,`mailStatus` text
,`mailToken` text
);

-- --------------------------------------------------------

--
-- テーブルの構造 `user_profile_list`
--

CREATE TABLE `user_profile_list` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `icon` text COMMENT 'アイコンのURL',
  `coverImg` text COMMENT 'カバー画像のURL',
  `name` text COMMENT 'ユーザー名',
  `message` text COMMENT 'ステータスメッセージ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- ビュー用の代替構造 `USER_PROFILE_VIEW`
-- (実際のビューを参照するには下にあります)
--
CREATE TABLE `USER_PROFILE_VIEW` (
`secretId` varchar(64)
,`userId` varchar(64)
,`createdAt` int(11)
,`status` text
,`icon` text
,`coverImg` text
,`name` text
,`message` text
);

-- --------------------------------------------------------

--
-- テーブルの構造 `user_secret_list`
--

CREATE TABLE `user_secret_list` (
  `secretId` varchar(64) NOT NULL COMMENT '内部処理用ID',
  `password` text NOT NULL COMMENT 'ハッシュされたパスワード',
  `otp` text COMMENT 'ワンタイムトークン'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- ビュー用の代替構造 `USER_TOKEN_VIEW`
-- (実際のビューを参照するには下にあります)
--
CREATE TABLE `USER_TOKEN_VIEW` (
`secretId` varchar(64)
,`userId` varchar(64)
,`userCreatedAt` int(11)
,`status` text
,`token` text
,`tokenCreatedAt` int(11)
);

-- --------------------------------------------------------

--
-- ビュー用の構造 `USER_MAIL_VIEW`
--
DROP TABLE IF EXISTS `USER_MAIL_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`qr4el_vuetempadmin`@`localhost` SQL SECURITY DEFINER VIEW `USER_MAIL_VIEW`  AS SELECT `user_list`.`secretId` AS `secretId`, `user_list`.`userId` AS `userId`, `user_list`.`createdAt` AS `createdAt`, `user_list`.`status` AS `status`, `user_mail_list`.`mailAddress` AS `mailAddress`, `user_mail_list`.`status` AS `mailStatus`, `user_mail_list`.`token` AS `mailToken` FROM (`user_mail_list` join `user_list`) WHERE (`user_mail_list`.`secretId` = `user_list`.`secretId`) ;

-- --------------------------------------------------------

--
-- ビュー用の構造 `USER_PROFILE_VIEW`
--
DROP TABLE IF EXISTS `USER_PROFILE_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`qr4el_vuetempadmin`@`localhost` SQL SECURITY DEFINER VIEW `USER_PROFILE_VIEW`  AS SELECT `user_list`.`secretId` AS `secretId`, `user_list`.`userId` AS `userId`, `user_list`.`createdAt` AS `createdAt`, `user_list`.`status` AS `status`, `user_profile_list`.`icon` AS `icon`, `user_profile_list`.`coverImg` AS `coverImg`, `user_profile_list`.`name` AS `name`, `user_profile_list`.`message` AS `message` FROM (`user_list` join `user_profile_list`) WHERE (`user_list`.`secretId` = `user_profile_list`.`secretId`) ;

-- --------------------------------------------------------

--
-- ビュー用の構造 `USER_TOKEN_VIEW`
--
DROP TABLE IF EXISTS `USER_TOKEN_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`qr4el_vuetempadmin`@`localhost` SQL SECURITY DEFINER VIEW `USER_TOKEN_VIEW`  AS SELECT `user_list`.`secretId` AS `secretId`, `user_list`.`userId` AS `userId`, `user_list`.`createdAt` AS `userCreatedAt`, `user_list`.`status` AS `status`, `user_accesstoken_list`.`token` AS `token`, `user_accesstoken_list`.`createdAt` AS `tokenCreatedAt` FROM (`user_list` join `user_accesstoken_list`) WHERE (`user_list`.`secretId` = `user_accesstoken_list`.`secretId`) ;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `api_list`
--
ALTER TABLE `api_list`
  ADD PRIMARY KEY (`secretId`);

--
-- テーブルのインデックス `api_listForView`
--
ALTER TABLE `api_listForView`
  ADD PRIMARY KEY (`secretId`);

--
-- テーブルのインデックス `push_token_list`
--
ALTER TABLE `push_token_list`
  ADD PRIMARY KEY (`pushId`);

--
-- テーブルのインデックス `user_accesstoken_list`
--
ALTER TABLE `user_accesstoken_list`
  ADD PRIMARY KEY (`tokenId`);

--
-- テーブルのインデックス `user_list`
--
ALTER TABLE `user_list`
  ADD PRIMARY KEY (`secretId`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- テーブルのインデックス `user_mail_list`
--
ALTER TABLE `user_mail_list`
  ADD PRIMARY KEY (`secretId`);

--
-- テーブルのインデックス `user_profile_list`
--
ALTER TABLE `user_profile_list`
  ADD PRIMARY KEY (`secretId`);

--
-- テーブルのインデックス `user_secret_list`
--
ALTER TABLE `user_secret_list`
  ADD PRIMARY KEY (`secretId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
