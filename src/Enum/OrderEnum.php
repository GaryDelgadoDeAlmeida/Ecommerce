<?php

namespace App\Enum;

abstract class OrderEnum {
    public const ORDER_CLIENT = "client";
    public const ORDER_STATUS = "status";
    public const ORDER_PAID_STATUS = "paid_status";
    public const ORDER_DETAILS = "details";

    protected static array $typeName = [
        self::ORDER_CLIENT => "client",
        self::ORDER_STATUS => "status",
        self::ORDER_PAID_STATUS => "paid_status",
        self::ORDER_DETAILS => "details"
    ];

    public static function getAvalaibleChoices() : array {
        return [
            self::ORDER_CLIENT,
            self::ORDER_STATUS,
            self::ORDER_PAID_STATUS,
            self::ORDER_DETAILS
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