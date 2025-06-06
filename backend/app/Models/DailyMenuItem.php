<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyMenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'description',
        'name',
        'price',
        'image',
        'category_id',
        'date'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class); 
    }
}
