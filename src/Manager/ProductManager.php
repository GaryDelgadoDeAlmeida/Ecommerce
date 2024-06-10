<?php

namespace App\Manager;

use App\Entity\Product;
use App\Enum\ProductEnum;
use App\Repository\ProductRepository;
use App\Manager\CharacteristicManager;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ProductManager {

    private CharacteristicManager $characteristicManager;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    function __construct(
        CharacteristicManager $characteristicManager, 
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->characteristicManager = $characteristicManager;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
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

            // Fields that can't be empty
            if(in_array($fieldName, [ProductEnum::PRODUCT_NAME]) && empty($fieldValue)) {
                throw new \Exception(
                    printf("The field %s can't be empty.", $fieldName)
                );
            }

            if($fieldName == ProductEnum::PRODUCT_IMAGE) {
                if(empty($fieldValue)) {
                    continue;
                }

                if(!($fieldValue instanceof UploadedFile)) {
                    throw new \Exception("The sended image must be an image");
                }
            } elseif($fieldName == ProductEnum::PRODUCT_NAME) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_DESCRIPTION) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_PRICE) {
                // 
            } elseif($fieldName == ProductEnum::PRODUCT_BRAND) {
                if($fieldValue == null) {
                    continue;
                }
            } elseif($fieldName == ProductEnum::PRODUCT_CATEGORY) {
                if($fieldValue == null) {
                    continue;
                }

                $fieldValue = $this->categoryRepository->findOneBy(["name" => $fieldValue]);
                if(!$fieldValue) {
                    continue;
                }
            } elseif($fieldName == ProductEnum::PRODUCT_CHARACTERISTICS) {
                if(empty($fieldValue)) {
                    continue;
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * 
     */
    public function fillProduct(array $fields, ?Product $product = new Product()) {
        $currentTime = new \DateTimeImmutable();

        try {
            if($product->getId()) {
                $product->setUpdatedAt($currentTime);
            } else {
                $product
                    ->setIsDeleted(false)
                    ->setCreatedAt($currentTime)
                ;
            }
    
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ProductEnum::PRODUCT_NAME) $product->setName($fieldValue);
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