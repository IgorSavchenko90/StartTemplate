<?php

  class simpleMailer {

    /* render_message */
    public function render_message( $post ){
      if ( !is_array( $post ) ) exit();
      // defaults
      $path       = "template/";
      $template   = "default";
      $form_title = "";
      // check 
      if ( isset( $post["form_template"] ) && $post["form_template"] != "" ){
        $template = htmlspecialchars( $post["form_template"] );
      }
      if ( isset( $post["form_title"] ) && $post["form_title"] != "" ){
        $form_title = htmlspecialchars( $post["form_title"] );
      }
      /* clear post */
      unset(
        $post['form_subject'], 
        $post['form_redirect'], 
        $post['form_title'],
        $post['form_template']
      );
      /* msg */
      ob_start();
        require( "{$path}{$template}.php" );
        $message .= ob_get_contents();
      ob_end_clean();

      return $message;
    }
    
    // send_email
    public function send_email( $args ){
      // defaults settings
      $to            = $args["to"];
      $from          = $args["from"];
      $sender        = $args["sender"];
      $subject       = $args["subject"];
      $message       = $args["message"];
      $attachments   = $args["attachments"];
      $form_redirect = $args["form_redirect"];
      // генерируем разделитель
      $end      = "\r\n";
      $boundary = "--".md5(uniqid(time())); 
      // разделитель указывается в заголовке в параметре boundary 
      $headers  = "MIME-Version: 1.0;" . $end; 
      $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"" . $end; 
      $headers .= "From: $from <$sender>" . $end; 
      $headers .= "Reply-To: $sender" . $end; 
      // subject in utf8
      $subject  = "=?utf-8?B?".base64_encode($subject)."?=";
      // message
      $message_all  = "--$boundary" . $end; 
      $message_all .= "Content-Type: text/html; charset=utf-8" . $end;
      $message_all .= "Content-Transfer-Encoding: base64" . $end;    
      $message_all .= $end;
      $message_all .= chunk_split(base64_encode($message));
      // if attachments
      if( is_array($attachments) && !empty($attachments) ) {
        foreach ($attachments as $key => $attachment) {
          if( !empty($attachment['tmp_name']) ) {
            $filename  = $attachment['name'];
            $file      = $attachment['tmp_name'];
            $file_size = filesize($file);
            $handle    = fopen($file, "r");
            $content   = fread($handle, $file_size);
            fclose($handle);
            $message_part  = $end . "--$boundary" . $end; 
            $message_part .= "Content-Type: application/octet-stream; name=\"$filename\"" . $end;  
            $message_part .= "Content-Transfer-Encoding: base64" . $end; 
            $message_part .= "Content-Disposition: attachment; filename=\"$filename\"" . $end; 
            $message_part .= $end;
            $message_part .= chunk_split(base64_encode($content));
            $message_part .= $end . "--$boundary--" . $end;
            $message_all  .= $message_part;
          }
        }
      }
      // send
      $result = array();
      if( mail( $to, $subject, $message_all, $headers ) ) {
        // form_redirect
        if ( $form_redirect != '' ) {
          $result['location'] = $form_redirect;
        }
      }
      return json_encode($result);
    }
  }

  $mail = new simpleMailer();

  // general
  $to            = "isavch90@gmail.com";
  $project_name  = "murmansk.valma53";
  $sender        = "test@showtest.zzz.com.ua";

  // config
  $subject       = $_POST["form_subject"];
  $form_redirect = $_POST["form_redirect"];
  $message       = $mail->render_message( $_POST );

  // send 
  $result = $mail->send_email(array(
    "to"            => $to,
    "from"          => $project_name,
    "sender"        => $sender,
    "subject"       => $subject,
    "message"       => $message,
    "attachments"   => $_FILES,
    "form_redirect" => $form_redirect,
  ));

  // exit with info
  exit( $result );

?>
