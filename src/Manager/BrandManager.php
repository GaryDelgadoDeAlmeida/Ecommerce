<?php

namespace App\Manager;

use App\Entity\Brand;
use App\Enum\BrandEnum;
use App\Repository\BrandRepository;

class BrandManager {

    private BrandRepository $brandRepository;

    function __construct(BrandRepository $brandRepository) {
        $this->brandRepository = $brandRepository;
    }

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = BrandEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == BrandEnum::BRAND_NAME) {
                // 
            } elseif($fieldName == BrandEnum::BRAND_ADDRESS) {
                // 
            } elseif($fieldName == BrandEnum::BRAND_ZIP_CODE) {
                // 
            } elseif($fieldName == BrandEnum::BRAND_CITY) {
                // 
            } elseif($fieldName == BrandEnum::BRAND_COUNTRY) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }
        
        return $fields;
    }

    /**
     * @param array fields
     * @param ?Brand
     * @return Brand|string
     */
    public function fillBrand(array $fields, ?Brand $brand = new Brand()) : Brand|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($brand->getId()) {
                $brand->setUpdatedAt($currentTime);
            } else {
                $brand
                    ->setIsDeleted(false)
                    ->setCreatedAt($currentTime)
                ;
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == BrandEnum::BRAND_NAME) $brand->setName($fieldValue);
                elseif($fieldName == BrandEnum::BRAND_ADDRESS) $brand->setAddress($fieldValue);
                elseif($fieldName == BrandEnum::BRAND_CITY) $brand->setCity($fieldValue);
                elseif($fieldName == BrandEnum::BRAND_ZIP_CODE) $brand->setZipCode($fieldValue);
                elseif($fieldName == BrandEnum::BRAND_COUNTRY) $brand->setCountry($fieldValue);
            }

            $this->brandRepository->save($brand, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $brand;
    }
}