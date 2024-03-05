<?php

namespace App\Enum;

abstract class BankDetailEnum {

    public const BANK_CARD_TYPE = "cardType";
    public const BANK_CARD_OWNER = "ownerName";

    // VISA / Master Card
    public const BANK_CARD_NUMBER = "cardNumber";
    public const BANK_CARD_EXPIRATION_DATE = "expirationDate";
    public const BANK_CARD_CVV = "cvv";

    // SEPA
    public const BANK_SEPA_BIC = "bic";
    public const BANK_SEPA_IBAN = "iban";

    public static function getAvailableChoice() : array {
        return [];
    }

    public static function getChoice() : array {
        return [];
    }
}