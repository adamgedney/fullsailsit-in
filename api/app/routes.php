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

	$dates = DB::select('SELECT day, date, start, instructor FROM schedule_events WHERE class = ?', array($data));

	echo json_encode($dates);
});





Route::get('/send-email', function()
{
	//http://localhost:8887/public/send-email
	$name = $_POST['name'];
	$from = $_POST['email'];
	$site = $_POST['website'];
	$phone = $_POST['phone'];
	$services = $_POST['services'];
	$list = "";

	//loops through checkboxes, concatenating onto list variable
	foreach ($services as $s){
	    $list .= $s . ", ";

	}

	//MAIL new subscriber info
	$header  = 'MIME-Version: 1.0' . "\r\n";
	$header .= "Reply-To: info@sgwebmarketing.com\r\n";
	$header .= "Return-Path: info@sgwebmarketing.com\r\n";
	$header .= 'From: Adam Gedney <info@sgwebmarketing.com>' . "\r\n";

	$to = 'info@sgwebmarketing.com';
	$subject = "New Request For Proposal SG Internet Marketing";

	$message = "You have a new RFP inquiry. \r\n \r\n" .
	"Name: " . $name . " \r\n" .
	"Email: " . $from . " \r\n" .
	"Website: " . $site . " \r\n" .
	"Phone: " . $phone . " \r\n" .
	"Services: " . $list . " \r\n \r\n" .
	"Keep on Truckin! \r\n" .
	"The SGIM Website Ghost";

	//send email
	// mail($to,$subject,$message,$header);
	mail($to,$subject,$message,$header);

});




