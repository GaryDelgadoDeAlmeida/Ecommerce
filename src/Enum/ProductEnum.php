<?php

namespace App\Enum;

abstract class ProductEnum {
    public const PRODUCT_NAME = "name";
    public const PRODUCT_DESCRIPTION = "description";
    public const PRODUCT_PRICE = "price";

    public array $typeName = [
        self::PRODUCT_NAME => "name",
        self::PRODUCT_DESCRIPTION => "description",
        self::PRODUCT_PRICE => "price"
    ];

    public static function getAvalaibleChoices() {
        return [
            self::PRODUCT_NAME,
            self::PRODUCT_DESCRIPTION,
            self::PRODUCT_PRICE
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