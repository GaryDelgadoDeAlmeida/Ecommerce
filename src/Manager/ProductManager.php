<?php

namespace App\Manager;

use App\Entity\Product;
use App\Enum\ProductEnum;
use App\Repository\ProductRepository;
use App\Manager\CharacteristicManager;

class ProductManager {

    private CharacteristicManager $characteristicManager;
    private ProductRepository $productRepository;

    function __construct(CharacteristicManager $characteristicManager, ProductRepository $productRepository) {
        $this->characteristicManager = $characteristicManager;
        $this->productRepository = $productRepository;
    }

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = ProductEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == ProductEnum::PRODUCT_IMAGE) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_NAME) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_DESCRIPTION) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_PRICE) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_BRAND) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_CATEGORY) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_CHARACTERISTICS) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    public function fillProduct(array $fields, ?Product $product = new Product()) {
        $currentTime = new \DateTimeImmutable();

        try {
            if($product->getId()) {
                $product->setUpdatedAt($currentTime);
            } else {
                $product->setCreatedAt($currentTime);
            }
    
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ProductEnum::PRODUCT_IMAGE) $product->setImage($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_NAME) $product->setName($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_DESCRIPTION) $product->setDescription($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_PRICE) $product->setPrice($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_BRAND) $product->setBrand($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_CATEGORY) $product->setCategory($fieldValue);
                elseif($fieldName == ProductEnum::PRODUCT_CHARACTERISTICS) {
                    $this->characteristicManager->fillCharacteristic($fieldValue, $product);
                }
            }

            $this->productRepository->save($product, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $product;
    }
}