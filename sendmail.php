<?php

// Токен
  const TOKEN =  "5063964378:AAGPhJjyfqrRqzMkpWU7Y1bIXhMKbvWOkgU";

  // ID чата
  const CHATID =  "-588239945";



if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $fileSendStatus = '';
  $textSendStatus = '';
  $msgs = [];
/*  $buster="Бустер не нужен";
  if($_POST['buster']=="yes"){$buster="Бустер нужен";}*/
  // Проверяем не пусты ли поля с именем и телефоном
  if (!empty($_POST['name']) && !empty($_POST['phone'])&&!empty($_POST['date_take'])&&!empty($_POST['date__back'])) {
    
    // Если не пустые, то валидируем эти поля и сохраняем и добавляем в тело сообщения. Минимально для теста так:
    $txt = "";
    
    // Имя
    if (isset($_POST['name']) && !empty($_POST['name'])) {
        $txt .= "Имя пославшего: " . strip_tags(trim(urlencode($_POST['name']))) . "%0A";
    }
    
    // Номер телефона
    if (isset($_POST['phone']) && !empty($_POST['phone'])) {
        $txt .= "Телефон: " . strip_tags(trim(urlencode($_POST['phone']))) . "%0A";
    }
     // Дата получения
	  if (isset($_POST['date_take']) && !empty($_POST['date_take'])) {
		$txt .= "Дата получения автомобиля: " . strip_tags(trim(urlencode($_POST['date_take']))) . "%0A";
  }
    // Дата получения
	 if (isset($_POST['date__back']) && !empty($_POST['date__back'])) {
		$txt .= "Дата возврата автомобиля: " . strip_tags(trim(urlencode($_POST['date__back']))) . "%0A";
  }
   if (isset($_POST['buster__yes']) && !empty($_POST['buster__yes'])) {
	$txt .= "Необходимо детское кресло" . strip_tags(trim(urlencode( $buster['buster__yes']))) . "%0A";
}if(isset($_POST['buster__no']) && !empty($_POST['buster__no'])) {
	$txt .= " " . strip_tags(trim(urlencode( $buster['buster__no']))) . "%0A";
}
    // Не забываем про тему сообщения
    if (isset($_POST['theme']) && !empty($_POST['theme'])) {
        $txt .= "Тема: " . strip_tags(urlencode($_POST['theme']));
    }

    $textSendStatus = @file_get_contents('https://api.telegram.org/bot'. TOKEN .'/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt); 

    if( isset(json_decode($textSendStatus)->{'ok'}) && json_decode($textSendStatus)->{'ok'} ) {
      if (!empty($_FILES['files']['tmp_name'])) {
    
          $urlFile =  "https://api.telegram.org/bot" . TOKEN . "/sendMediaGroup";
          
          // Путь загрузки файлов
          $path = $_SERVER['DOCUMENT_ROOT'] . '/telegramform/tmp/';
          
         
      }
      echo json_encode('SUCCESS');
    } else {
      echo json_encode('ERROR');
      // 
      // echo json_decode($textSendStatus);
    }
  } else {
    echo json_encode('NOTVALID');
  }
} else {
  header("Location: /");
}
