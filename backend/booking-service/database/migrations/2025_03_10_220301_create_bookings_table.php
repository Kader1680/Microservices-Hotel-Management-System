<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');  
            $table->unsignedBigInteger('id_room'); 
            $table->date('checkin');  
            $table->date('checkout');  
            $table->decimal('total_price', 10, 2); 
            $table->string('status')->default('pending');
     
            $table->foreign('id_user')->references('id')->on('auth_db.users')->onDelete('cascade');
            $table->foreign('id_room')->references('id')->on('rooms')->onDelete('cascade');
            
   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
