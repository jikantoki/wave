<?php
//メール関係

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to, $title, $message)
{
  try {
    //全メール共通設定
    $mail = new PHPMailer(true);
    $mail->CharSet = 'utf-8';
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = SMTP_Server;
    $mail->Username = SMTP_Username;
    $mail->Password = SMTP_Password;
    $mail->Port = SMTP_Port;
    $mail->setFrom(SMTP_Mailaddress);
    $mail->FromName = SMTP_Name;
    $mail->isHTML(true);

    //メールによる設定
    $mail->addAddress($to);
    $mail->Subject = $title;
    $mail->Body = $message;

    //送信
    $mail->send();
  } catch (Exception $e) {
    echo $e;
  }
}
