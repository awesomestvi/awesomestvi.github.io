<?php //echo "<pre>";print_r($_POST);
	$to = "swati@redpeppermedia.in, pc@redpeppermedia.in";
	$subject = "Contact Us";

	$message = "
	<html>
		<head>
			<title>HTML email</title>
		</head>
		<body>
			<p>Kindly contact me at</p>
			<p><strong>Name :</strong> ".trim($_POST['contact_name'])."</p>
			<p><strong>Email :</strong> ".trim($_POST['contact_email'])."</p>
			<p><strong>Contact Number :</strong> ".trim($_POST['contact_number'])."</p>		
			<p><strong>Comment :</strong> ".trim($_POST['contact_comment'])."</p>		
		</body>
	</html>";
	//echo $message;exit;	

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: contact@redpeppermedia.in' . "\r\n";

	if (mail($to,$subject,$message,$headers)){
		echo json_encode('success');
	}else{
		echo json_encode('error');
	}
?>
