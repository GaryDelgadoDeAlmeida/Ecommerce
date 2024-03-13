<?php

namespace App\Manager;

use App\Entity\Category;
use App\Enum\CategoryEnum;
use App\Repository\CategoryRepository;

class CategoryManager {

    private CategoryRepository $categoryRepository;

    function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @param array json body
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedChoices = CategoryEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedChoices)) {
                continue;
            }

            if($fieldName == CategoryEnum::CATEGORY_NAME) {
                // 
            } elseif($fieldName == CategoryEnum::CATEGORY_DESCRIPTION) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Category
     * @return Category|string
     */
    public function fillCategory(array $fields, ?Category $category = new Category()) : Category|string {
        $currentTime = new \DateTimeImmutable();

        try {
            if($category->getId()) {
                $category->setUpdatedAt($currentTime);
            } else {
                $category->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == CategoryEnum::CATEGORY_NAME) $category->setName($fieldValue);
                elseif($fieldName == CategoryEnum::CATEGORY_DESCRIPTION) $category->setDescription($fieldValue);
            }

            $this->categoryRepository->save($category, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $category;
    }
}