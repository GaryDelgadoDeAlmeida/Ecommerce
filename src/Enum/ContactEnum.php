<?php

namespace App\Enum;

abstract class ContactEnum {

    public const CONTACT_FULLNAME = "fullname";
    public const CONTACT_EMAIL = "email";
    public const CONTACT_SUBJECT = "subject";
    public const CONTACT_MESSAGE = "message";

    public static array $typeName = [
        self::CONTACT_FULLNAME => "Fullname",
        self::CONTACT_EMAIL => "Email",
        self::CONTACT_SUBJECT => "Subject",
        self::CONTACT_MESSAGE => "Message"
    ];

    public static function getAvalaibleChoice() : array {
        return [
            self::CONTACT_FULLNAME,
            self::CONTACT_EMAIL,
            self::CONTACT_SUBJECT,
            self::CONTACT_MESSAGE
        ];
    }

    public function getChoice() : array {
        $choices = [];

        foreach(self::getAvalaibleChoice() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}