<?php

namespace App\Manager;

use App\Repository\ProductRepository;

class ProductManager {

    private ProductRepository $productRepository;

    function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function postProduct() {
        // 
    }

    public function updateProduct(Product $product) {
        // 
    }
}