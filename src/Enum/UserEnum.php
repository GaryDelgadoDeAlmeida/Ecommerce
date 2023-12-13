<?php

namespace App\Enum;

abstract class UserEnum {

    private const USER_FIRSTNAME = "firtname";
    private const USER_LASTNAME = "lastname";
    private const USER_ADDRESS = "address";
    private const USER_CITY = "city";
    private const USER_ZIP_CODE = "zip_code";
    private const USER_COUNTRY = "country";
    private const USER_PHONE = "phone";
    private const USER_EMAIL = "email";
    private const USER_PASSWORD = "password";

    public static array $typeName = [
        self::USER_FIRSTNAME => "Firstname",
        self::USER_LASTNAME => "Lastname",
        self::USER_ADDRESS => "Address",
        self::USER_CITY => "City",
        self::USER_ZIP_CODE => "Zip code",
        self::USER_COUNTRY => "Country",
        self::USER_PHONE => "Phone number",
        self::USER_EMAIL => "Email",
        self::USER_PASSWORD => "Password"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::USER_FIRSTNAME,
            self::USER_LASTNAME,
            self::USER_ADDRESS,
            self::USER_CITY,
            self::USER_ZIP_CODE,
            self::USER_COUNTRY,
            self::USER_PHONE,
            self::USER_EMAIL,
            self::USER_PASSWORD
        ];
    }

    public static function getChoices() 
    {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[static::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}