<?php

namespace App\Enum;

abstract class BrandEnum {

    public const BRAND_NAME = "name";
    public const BRAND_ADDRESS = "address";
    public const BRAND_ZIP_CODE = "zipCode";
    public const BRAND_CITY = "city";
    public const BRAND_COUNTRY = "country";

    protected static array $typeName = [
        self::BRAND_NAME => "Name",
        self::BRAND_ADDRESS => "Address",
        self::BRAND_ZIP_CODE => "Zip Code",
        self::BRAND_CITY => "City",
        self::BRAND_COUNTRY => "Country"
    ];

    public static function getAvalaibleChoices() : array {
        return [
            self::BRAND_NAME,
            self::BRAND_ADDRESS,
            self::BRAND_ZIP_CODE,
            self::BRAND_CITY,
            self::BRAND_COUNTRY
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvalaibleChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}