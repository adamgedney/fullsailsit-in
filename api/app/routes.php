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

// public function __construct()
// {
//     $this->afterFilter(function($response)
//     {
//         $response->headers->set('Access-Control-Allow-Origin', '*');
//         return $response;
//     });
// };

// header('content-type: application/json; charset=utf-8');
// header('Access-Control-Allow-Origin: *');

Route::get('/get-classes', function()
{
	//http://localhost:8887/public/get-classes

	$classes = DB::select('SELECT DISTINCT(class) FROM schedule_events WHERE course LIKE "%WDD%"');

	// return json_encode($classes);
	header('Access-Control-Allow-Origin: *');
	return Response::json($classes);
});





Route::get('/get-dates', function()
{
	//http://localhost:8887/public/get-dates?data=PWA1

	$data = $_GET['data'];

	$dates = DB::select('SELECT class, day, date, start, room, instructor FROM schedule_events WHERE class = ?', array($data));

	header('Access-Control-Allow-Origin: *');
	return Response::json($dates);
});




Route::get('/get-next', function()
{

	$class = $_GET['class'];
	$date = $_GET['date'];


	$next = DB::select(DB::raw('SELECT day, date, start, room, instructor FROM schedule_events WHERE class = "' . $class . '" AND start > "' . $date . '" LIMIT 1'));

	header('Access-Control-Allow-Origin: *');
	return Response::json($next);
});





Route::get('/send-email', function()
{
	//http://localhost:8887/public/send-email
	$className = $_GET['className'];
	$day = $_GET['day'];
	$date = $_GET['date'];
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
	$subject = $inst . "! You have a new Full Sail sit-in Notification";

	$message = $inst . "! You have a new Full Sail sit-in Notification. \r\n \r\n" .
	"Student Name: " . $userName . " \r\n" .
	"Email: " . $userEmail . " \r\n \r\n" .
	"This student has sent you a sit-in request from the Full Sail Sit-In webapp. Please reply to this student as soon as possible to accept or deny their request to sit in on: " .
	$className . " \r\n" .
	"on: " . $day . " " . $date . " \r\n \r\n" .

	"Again, please reply to this student as soon as possible to accept or deny his/her request to sit in on your lecture. \r\n \r\n" .
	"Keep on Teachin!";

	//send email
	$mail = mail($to,$subject,$message,$header);

	header('Access-Control-Allow-Origin: *');
	return Response::json($mail);

});




