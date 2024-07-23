<?php

namespace App\Enum;

abstract class ProductEnum {
    public const PRODUCT_IMAGE = "image";
    public const PRODUCT_NAME = "name";
    public const PRODUCT_BRAND = "brand";
    public const PRODUCT_CATEGORY = "category";
    public const PRODUCT_DESCRIPTION = "description";
    public const PRODUCT_PRICE = "price";
    public const PRODUCT_CHARACTERISTICS = "characteristics";
    public const PRODUCT_PREVIEWS = "previews";

    public array $typeName = [
        self::PRODUCT_IMAGE => "Image",
        self::PRODUCT_NAME => "Name",
        self::PRODUCT_DESCRIPTION => "Description",
        self::PRODUCT_PRICE => "Price",
        self::PRODUCT_CATEGORY => "Category",
        self::PRODUCT_BRAND => "Brand",
        self::PRODUCT_CHARACTERISTICS => "Characteristics",
        self::PRODUCT_PREVIEWS => "Previews"
    ];

    public static function getAvalaibleChoices() {
        return [
            self::PRODUCT_IMAGE,
            self::PRODUCT_NAME,
            self::PRODUCT_DESCRIPTION,
            self::PRODUCT_PRICE,
            self::PRODUCT_CATEGORY,
            self::PRODUCT_BRAND,
            self::PRODUCT_CHARACTERISTICS,
            self::PRODUCT_PREVIEWS
        ];
    }

    public static function getChoices() {
        $choices = [];

        foreach(self::getAvalaibleChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}