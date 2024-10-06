<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable = [
        'item_name',       // Add this line
                             // Adjust according to your form data
        'price',           // Adjust according to your form data
        'description',     // Include any other fields you have
        'qty',             // Include quantity or any other fields if applicable
        'unit_of_measurement', // Include measurement field if applicable
        // Add other fields if you have them
    ];
}
