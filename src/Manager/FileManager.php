<?php

namespace App\Manager;

use App\Entity\Product;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileManager {

    /**
     * @param UploadedFile
     * @param Product
     * @param string
     * @return Product
     */
    public function saveProductImage(UploadedFile $file, Product $product, string $destination_path) {
        $destination_path .= "{$product->getId()}";
        if(!file_exists($destination_path)) {
            mkdir($destination_path, 0777, true);
        }

        $filepath = "/content/img/products/{$product->getId()}/{$product->getName()}.{$file->getClientOriginalExtension()}";
        if(!copy($file->getPathname(), $destination_path . "/{$product->getName()}.{$file->getClientOriginalExtension()}")) {
            throw new \Exception("An error has been encountered. The sended image couldn't be save.");
        }

        $product->setImage($filepath);
        return $product;
    }

    /**
     * @param UploadedFile[] files
     * @param string destination_path
     */
    public function saveProductPreviews(array $files, string $destination_path) {
        foreach($files as $file) {
            (new \App\Entity\ProductImage())
                ->setProduct($product)
                ->setPath($file->getPath())
                ->setIsLogo(false)
                ->setCreatedAt(new \DateTime())
            ;
        }
    }
}