<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

Route::get('/get-classes', function()
{
	//http://localhost:8887/public/get-classes

	$classes = DB::select('SELECT DISTINCT(class) FROM schedule_events WHERE course LIKE "%WDD%"');

	echo json_encode($classes);
});





Route::get('/get-dates', function()
{
	//http://localhost:8887/public/get-dates?data=PWA1

	$data = $_GET['data'];

	$dates = DB::select('SELECT day, date, start, room, instructor FROM schedule_events WHERE class = ?', array($data));

	echo json_encode($dates);
});





Route::get('/send-email', function()
{
	//http://localhost:8887/public/send-email
	$className = $_GET['className'];
	$day = $_GET['day'];
	$date = $_GET['date'];
	$time = $_GET['time'];
	$inst = $_GET['instructor'];
	$instEmail = $_GET['instEmail'];
	$userEmail = $_GET['userEmail'];
	$userName = $_GET['userName'];



	//Build Mailer
	$header  = 'MIME-Version: 1.0' . "\r\n";
	$header .= "Reply-To: ' . $userEmail . '\r\n";
	$header .= "Return-Path: ' . $userEmail . '\r\n";
	$header .= 'From: ' . $userName . ' <' . $userEmail . '>' . "\r\n";

	$to = $instEmail;
	$subject = $inst . " You have a new Full Sail sit-in Notification";

	$message = $inst . "You have a new Full Sail sit-in Notification. \r\n \r\n" .
	"Student Name: " . $userName . " \r\n" .
	"Email: " . $userEmail . " \r\n" .
	"This student has sent you a sit-in request from the Full Sail Sit-In webapp. Please reply to this student as soon as possible to accept or deny their request to sit in on: " .
	$className . " \r\n" .
	"on: " . $day . " " . $date . " \r\n \r\n" .
	"at: " . $time . " \r\n \r\n" .

	"Again, please reply to this student as soon as possible to accept or deny his/her request to sit in on your lecture. \r\n" .
	"Keep on Teachin!";

	//send email
	$mail = mail($to,$subject,$message,$header);

	echo json_encode($mail);

});



