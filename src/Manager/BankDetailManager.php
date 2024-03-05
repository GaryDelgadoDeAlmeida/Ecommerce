<?php

namespace App\Manager;

use App\Entity\BankDetail;
use App\Enum\BankDetailEnum;
use App\Manager\FormManager;
use App\Repository\BankDetailRepository;
use Symfony\Component\HttpFoundation\Response;

class BankDetailManager {

    private FormManager $formManager;
    private BankDetailRepository $bankDetailRepository;

    function __construct(FormManager $formManager, BankDetailRepository $bankDetailRepository) {
        $this->formManager = $formManager;
        $this->bankDetailRepository = $bankDetailRepository;
    }

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = BankDetailEnum::getAvailableChoice();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == BankDetailEnum::BANK_CARD_TYPE) {
                // 
            } elseif($fieldName == BankDetailEnum::BANK_CARD_OWNER) {
                // 
            } elseif($fieldName == BankDetailEnum::BANK_CARD_NUMBER) {
                // 
            } elseif($fieldName == BankDetailEnum::BANK_CARD_EXPIRATION_DATE) {
                // 
            } elseif($fieldName == BankDetailEnum::BANK_CARD_CVV) {
                if(!$this->formManager->checkMaxLength($fieldValue, 3)) {
                    throw new \Exception("The CVV Code must be", Response::HTTP_FORBIDDEN);
                }
            } elseif($fieldName == BankDetailEnum::BANK_SEPA_BIC) {
                // 
            } elseif($fieldName == BankDetailEnum::BANK_SEPA_IBAN) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param User user
     * @param ?BankDetail
     * @return BankDetail|string
     */
    public function fillBankDetail(array $fields, User $user, ?BankDetail $bankDetail = new BankDetail()) : BankDetail|string {
        $currentTime = new \DateTimeImmutable();

        try {
            if($bankDetail->getId()) {
                $bankDetail->setUpdatedAt($currentTime);
            } else {
                $bankDetail
                    ->setClient($user)
                    ->setCreatedAt($currentTime)
                ;
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == BankDetailEnum::BANK_CARD_TYPE) $bankDetail->setCardType($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_CARD_OWNER) $bankDetail->setOwnerName($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_CARD_NUMBER) $bankDetail->setCardNumber($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_CARD_EXPIRATION_DATE) $bankDetail->setExpirationDate($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_CARD_CVV) $bankDetail->setCvv($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_SEPA_BIC) $bankDetail->setBic($fieldValue);
                elseif($fieldName == BankDetailEnum::BANK_SEPA_IBAN) $bankDetail->setIban($fieldValue);
            }
            
            // Save data into database
            $this->bankDetailRepository->save($bankDetail, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $bankDetail;
    }
}