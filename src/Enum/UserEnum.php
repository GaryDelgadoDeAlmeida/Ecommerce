<?php

namespace App\Enum;

abstract class UserEnum {

    public const USER_FIRSTNAME = "firtname";
    public const USER_LASTNAME = "lastname";
    public const USER_ADDRESS = "address";
    public const USER_CITY = "city";
    public const USER_ZIP_CODE = "zipCode";
    public const USER_COUNTRY = "country";
    public const USER_PHONE = "phone";
    public const USER_EMAIL = "email";
    public const USER_PASSWORD = "password";
    
    public const USER_NEW_PASSWORD = "new_password";
    public const USER_CONFIRM_NEW_PASSWORD = "confirm_new_password";

    public static array $typeName = [
        self::USER_FIRSTNAME => "Firstname",
        self::USER_LASTNAME => "Lastname",
        self::USER_ADDRESS => "Address",
        self::USER_CITY => "City",
        self::USER_ZIP_CODE => "Zip code",
        self::USER_COUNTRY => "Country",
        self::USER_PHONE => "Phone number",
        self::USER_EMAIL => "Email",
        self::USER_PASSWORD => "Password",
        self::USER_NEW_PASSWORD => "New Password"
    ];

    public static function getRequiredFields() : array {
        return [
            self::USER_FIRSTNAME,
            self::USER_LASTNAME,
            self::USER_ADDRESS,
            self::USER_CITY,
            self::USER_ZIP_CODE,
            self::USER_COUNTRY,
            self::USER_EMAIL,
            self::USER_PASSWORD,
            self::USER_NEW_PASSWORD,
            self::USER_CONFIRM_NEW_PASSWORD
        ];
    }

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
            self::USER_PASSWORD,
            self::USER_NEW_PASSWORD,
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