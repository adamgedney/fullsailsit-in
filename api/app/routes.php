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

Route::get('/get-classes', function()
{
	//http://localhost:8887/public/get-classes

	$classes = DB::select('SELECT DISTINCT(class) FROM schedule_events WHERE course LIKE "%WDD%"');

	header('content-type: application/json; charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($classes);
});

Route::get('/get-dates', function()
{
	//http://localhost:8887/public/get-dates
	echo "get dates";
});

Route::get('/get-teacher', function()
{
	//http://localhost:8887/public/get-teacher
	echo "get teacher";
});

Route::get('/get-email', function()
{
	//http://localhost:8887/public/get-email
	echo "get email";
});

Route::get('/send-email', function()
{
	//http://localhost:8887/public/send-email

});