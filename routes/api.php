<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware('jwt.verify')->group(function(){
    Route::get('users',[UserController::class,'index']);
    
    Route::get('products',[ProductController::class,'index']);
    
    Route::get('showproduct/{id}',[ProductController::class,'show']);
    Route::post('createproducts',[ProductController::class,'store']);
    Route::put('updateproduct/{id}',[ProductController::class,'update']);
    Route::delete('deleteproduct/{id}',[ProductController::class,'destroy']);
});

Route::get('categories',[ProductController::class,'getCategories']);
//VENTA DE PRODUCTO
Route::post('saleproduct',[ProductController::class,'saleProduct']);