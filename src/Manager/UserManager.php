<?php

namespace App\Manager;

use App\Entity\User;
use App\Enum\UserEnum;
use App\Manager\FormManager;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserManager {
    
    private UserPasswordHasherInterface $encoder;
    private FormManager $formManager;
    private UserRepository $userRepository;
    
    function __construct(
        UserPasswordHasherInterface $encoder,
        FormManager $formManager,
        UserRepository $userRepository
    ) {
        $this->encoder = $encoder;
        $this->formManager = $formManager;
        $this->userRepository = $userRepository;
    }

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $requiredFields = UserEnum::getRequiredFields();
        $allowedFields = UserEnum::getAvailableChoices();

        foreach($jsonContent as $key => $value) {
            if(!in_array($key, $allowedFields)) {
                continue;
            }

            // Check if the current row is a required data
            if(in_array($key, $requiredFields)) {
                if($this->formManager->isEmpty($value)) {
                    throw new \Exception(
                        sprintf("The %s field can't be empty", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            }

            if($key == UserEnum::USER_FIRSTNAME) {
                $characterLength = 100;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_LASTNAME) {
                $characterLength = 150;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_ADDRESS) {
                $characterLength = 255;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_CITY) {
                $characterLength = 20;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_ZIP_CODE) {
                $characterLength = 10;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_COUNTRY) {
                // 
            } elseif($key == UserEnum::USER_PHONE) {
                $characterLength = 10;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception(
                        sprintf("The %s field value must not exceed %s caracters length", $key, $characterLength), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($key == UserEnum::USER_EMAIL) {
                if(!$this->formManager->isEmail($value)) {
                    throw new \Exception("The sended email must be a valid email", Response::HTTP_FORBIDDEN);
                }

                $characterLength = 180;
                if(!$this->formManager->checkMaxLength($value, $characterLength)) {
                    throw new \Exception("The sended email mustn't exceed {$characterLength} characters length", Response::HTTP_FORBIDDEN);
                }

                if(!isset($jsonContent["id"]) && $this->userRepository->findOneBy(["email" => $value])) {
                    throw new \Exception("An user already exist using this email", Response::HTTP_FORBIDDEN);
                }
            } elseif($key == UserEnum::USER_PASSWORD) {
                $minLength = 8;
                if(!$this->formManager->checkMinLength($value, $minLength)) {
                    throw new \Exception("The password must be at least {$minLength} characters length", Response::HTTP_FORBIDDEN);
                }

                if(!$this->formManager->isSecurePassword($value)) {
                    throw new \Exception("The password is not secured enought", Response::HTTP_FORBIDDEN);
                }
            } elseif($key == UserEnum::USER_NEW_PASSWORD) {
                if(!isset($jsonContent[UserEnum::USER_CONFIRM_NEW_PASSWORD])) {
                    throw new \Exception("An important field don't exist.", Response::HTTP_FORBIDDEN);
                }

                if($jsonContent[UserEnum::USER_CONFIRM_NEW_PASSWORD] !== $value) {
                    throw new \Exception("The password isn't correct. Please, check all fields", Response::HTTP_FORBIDDEN);
                }

                $key = UserEnum::USER_PASSWORD;
            }

            $fields[$key] = $value;
        }

        return $fields;
    }

    /**
     * 
     */
    public function postUser(
        string $firstname,
        string $lastname,
        string $address,
        string $city,
        string $country,
        string $phone,
        string $email, // Also, login user
        string $password,
        array $roles = ["ROLE_USER"]
    ) : User {
        $user = (new User())
            ->setFirstname($firstname)
            ->setLastname($lastname)
            ->setAddress($address)
            ->setCity($city)
            ->setCountry($country)
            ->setPhone($phone)
            ->setEmail($email)
            ->setRoles($roles)
        ;

        $user->setPassword($this->encoder->hashPassword($user, $password));

        $this->userRepository->save($user, true);

        return $user;
    }

    /**
     * @param User user
     * @param array fields / attribute to update
     * @return User
     */
    public function fillUser(array $fields, ?User $user = new User()) : User {
        $currentTime = new \DateTimeImmutable();

        if(!$user->getId()) {
            $user->setCreatedAt($currentTime);
        } else {
            $user->setUpdatedAt($currentTime);
        }

        foreach($fields as $fieldName => $fieldValue) {
            if($fieldName == UserEnum::USER_FIRSTNAME) $user->setFirstname($fieldValue);
            elseif($fieldName == UserEnum::USER_LASTNAME) $user->setLastname($fieldValue);
            elseif($fieldName == UserEnum::USER_ADDRESS) $user->setAddress($fieldValue);
            elseif($fieldName == UserEnum::USER_CITY) $user->setCity($fieldValue);
            elseif($fieldName == UserEnum::USER_ZIP_CODE) $user->setZipCode($fieldValue);
            elseif($fieldName == UserEnum::USER_COUNTRY) $user->setCountry($fieldValue);
            elseif($fieldName == UserEnum::USER_PHONE) $user->setPhone($fieldValue);
            elseif($fieldName == UserEnum::USER_PASSWORD) $user->setPassword($this->encoder->hashPassword($user, $fieldValue));
        }

        try {
            $this->userRepository->save($user, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $user;
    }
}