<?php

namespace App\Enum;

abstract class OrderDeliveryStatusEnum {
    
    public const STATUS_WAITING = "waiting";
    public const STATUS_ONGOING = "ongoing";
    public const STATUS_DELIVERED = "delivery";

    public array $typeName = [
        self::STATUS_WAITING => "WAITING",
        self::STATUS_ONGOING => "ONGOING",
        self::STATUS_DELIVERED => "DELIVERED",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::STATUS_WAITING,
            self::STATUS_ONGOING,
            self::STATUS_DELIVERED,
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