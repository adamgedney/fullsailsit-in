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

});




