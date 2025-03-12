<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
{
    use HasFactory;
 

    protected $fillable = [
        'id_user',
        'id_room',
        'checkin',
        'checkout',
        'total_price',
        'status'
    ];
 
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

 
    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }
}
