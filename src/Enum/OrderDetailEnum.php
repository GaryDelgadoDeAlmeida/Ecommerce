<?php

namespace App\Enum;

abstract class OrderDetailEnum {
    public const ORDER_DETAIL_ORDER = "client_order";
    public const ORDER_DETAIL_PRODUCT = "product";
    public const ORDER_DETAIL_QUANTITY = "quantity";

    protected static array $typeName = [
        self::ORDER_DETAIL_ORDER => "Order",
        self::ORDER_DETAIL_PRODUCT => "Product",
        self::ORDER_DETAIL_QUANTITY => "Quantity"
    ];

    public static function getAvalaibleChoices() : array {
        return [
            self::ORDER_DETAIL_ORDER,
            self::ORDER_DETAIL_PRODUCT,
            self::ORDER_DETAIL_QUANTITY
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