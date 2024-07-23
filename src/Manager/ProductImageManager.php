<?php

namespace App\Manager;

use App\Entity\Product;
use App\Entity\ProductImage;
use App\Repository\ProductImageRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ProductImageManager {

    private ProductImageRepository $productImageRepository;

    function __construct(ProductImageRepository $productImageRepository) {
        $this->productImageRepository = $productImageRepository;
    }

    /**
     * Remove all previews + logo from a product
     * 
     * @param Product product
     * @return boolean|string
     */
    public function removeAllProductImages(Product $product, string $destination_path) {
        $productImages = $product->getProductImages();
        if(empty($productImages)) {
            return true;
        }

        try {
            // Remove physical object
            foreach($productImages as $productImage) {
                $filePath = $productImage->getPath();

                if(file_exists($filePath)) {
                    unlink($filePath);
                }

                $this->productImageRepository->remove($productImage);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Save sended logo + all previews in a product
     * 
     * @param UploadedFile[] files
     * @param string destination_path
     * @return void|string
     */
    public function saveProductPreviews(array $files, Product $product, string $destination_path) {
        try {
            $currentTime = new \DateTimeImmutable();
            foreach($files as $index => $file) {
                if(empty($file)) {
                    continue;
                }

                if(!$file->getPath()) {
                    throw new \Exception("Une erreur a été rencontrée avec le fichier {$file->getClientOriginalName()}");
                    continue;
                }
    
                $isLogo = false;
                $filename = str_replace([" "], ["-"], strtolower($product->getName())) . "({$index}).{$file->getClientOriginalExtension()}";
                if($index == 0) {
                    $isLogo = true;
                    $filename = "{$product->getName()}.{$file->getClientOriginalExtension()}";
                }
    
                $destination_path .= "{$product->getId()}";
                if(!file_exists($destination_path)) {
                    mkdir($destination_path, 0777, true);
                }

                $filepath = "/content/img/products/{$product->getId()}/{$filename}";
                if(!rename($file->getPath(), $destination_path . "/{$filename}")) {
                    throw new \Exception("An error has been encountered. The sended image couldn't be save in the destination directory.");
                }
    
                $productImage = (new ProductImage())
                    ->setProduct($product)
                    ->setName($filename)
                    ->setPath($filepath)
                    ->setIsLogo($isLogo)
                    ->setCreatedAt($currentTime)
                ;
    
                $this->productImageRepository->save($productImage, true);
            }
        } catch(\Exception $e) {
            return trim($e->getMessage());
        }

        return;
    }

    /**
     * Replace product logo
     * 
     * @param UploadedFile $logo
     * @param Product $product
     * @return void|string
     */
    public function replaceProductLogo(UploadedFile $logo, Product $product) {
        try {
            $filename = str_replace([" "], ["-"], strtolower($product->getName())) . ".{$file->getClientOriginalExtension()}";
            $destination_path .= "{$product->getId()}";
            if(!file_exists($destination_path)) {
                mkdir($destination_path, 0777, true);
            }

            $filepath = "/content/img/products/{$product->getId()}/{$filename}";
            if(!rename($file->getPath(), $destination_path . "/{$filename}")) {
                throw new \Exception("An error has been encountered. The sended image couldn't be save in the destination directory.");
            }

            $productLogo = $product->getProductLogo();
            if(!$productLogo) {
                $productLogo = (new ProductImage())
                    ->setProduct($product)
                    ->setPath($filepath)
                    ->setIsLogo(true)
                    ->setCreatedAt(new \DateTimeImmutable())
                ;

                $this->productImageRepository->save($productLogo, true);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Replace product previews
     * 
     * TODO:: Take in the logic process => In the parameter "files", we must have in it, all remaining 
     * previews (previews who wasn't removed in the front) + all new file previews
     * 
     * @param array files
     * @param Product $product
     * @return void|string
     */
    public function replaceProductImages(array $files, Product $product, string $destination_path) {
        try {
            $destination_path .= "{$product->getId()}";
            if(!file_exists($destination_path)) {
                mkdir($destination_path, 0777, true);
            }

            foreach($files as $file) {
                $filename = str_replace([" "], ["-"], strtolower($product->getName())) . "({$index}).{$file->getClientOriginalExtension()}";
                $filepath = "/content/img/products/{$product->getId()}/{$filename}";

                // Replace the existing file if exist
                if(!rename($file->getPath(), $destination_path . "/{$filename}")) {
                    throw new \Exception("An error has been encountered. The sended image couldn't be save in the destination directory.");
                }

                // Create product preview if the file with the index don't exist
                $productLogo = $product->getProductLogo();
                if(!$productLogo) {
                    $productLogo = (new ProductImage())
                        ->setProduct($product)
                        ->setPath($filepath)
                        ->setIsLogo(true)
                        ->setCreatedAt(new \DateTimeImmutable())
                    ;

                    $this->productImageRepository->save($productLogo, true);
                }
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * @param array fileID
     * @param string $products img directory
     * @return boolean|string
     */
    public function removeProductPreviews(array $filesID, string $products_path) {
        try {
            foreach($filesID as $fileID) {
                $productImage = $this->productImageRepository->find($fileID);
                if(file_exists($products_path . $productImage->getFilepath())) {
                    unlink($products_path . $productImage->getFilepath());
                }
    
                $this->productImageRepository->remove($productImage, true);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return true;
    }
}