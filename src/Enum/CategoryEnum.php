<?php

namespace App\Enum;

abstract class CategoryEnum {
    public const CATEGORY_NAME = "name";
    public const CATEGORY_DESCRIPTION = "description";

    protected static array $typeName = [
        self::CATEGORY_NAME => "Category name",
        self::CATEGORY_DESCRIPTION => "Description"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::CATEGORY_NAME,
            self::CATEGORY_DESCRIPTION
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}