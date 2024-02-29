<?php

namespace App\Manager;

use App\Entity\Contact;
use App\Enum\ContactEnum;
use App\Repository\ContactRepository;

class ContactManager {

    private ContactRepository $contactRepository;

    function __construct(ContactRepository $contactRepository) {
        $this->contactRepository = $contactRepository;
    }

    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = ContactEnum::getAvalaibleChoice();

        foreach($jsonContent as $fieldName => $fieldValue) {

            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }
            
            if($fieldName == ContactEnum::CONTACT_FULLNAME) {}
            elseif($fieldName == ContactEnum::CONTACT_EMAIL) {}
            elseif($fieldName == ContactEnum::CONTACT_SUBJECT) {}
            elseif($fieldName == ContactEnum::CONTACT_MESSAGE) {}

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param Contact contact
     * @return Contact|string
     */
    public function fillContact(array $fields, ?Contact $contact = new Contact()) : Contact|string {
        try {
            if(!$contact->getId()) {
                $contact->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ContactEnum::CONTACT_FULLNAME) $contact->setFullname($fieldValue);
                elseif($fieldName == ContactEnum::CONTACT_EMAIL) $contact->setEmail($fieldValue);
                elseif($fieldName == ContactEnum::CONTACT_SUBJECT) $contact->setSubject($fieldValue);
                elseif($fieldName == ContactEnum::CONTACT_MESSAGE) $contact->setMessage($fieldValue);
            }

            $this->contactRepository->save($contact, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $contact;
    }
}