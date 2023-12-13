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
        $allowedFields = UserEnum::getAvailableChoices();

        foreach($jsonContent as $key => $value) {
            if(!in_array($key, $allowedFields)) {
                continue;
            }

            if($key == UserEnum::USER_FIRSTNAME) {
                if($this->formManager->isEmpty($value)) {
                    throw new \Exception("The firstname field can't be empty", Response::HTTP_FORBIDDEN);
                }

                if(!$this->formManager->checkMaxLength($value, 100)) {
                    throw new \Exception("The firstname field value must not exceed 100 caracters length", Response::HTTP_FORBIDDEN);
                }
            } elseif($key == UserEnum::USER_LASTNAME) {
                // 
            } elseif($key == UserEnum::USER_ADDRESS) {
                // 
            } elseif($key == UserEnum::USER_CITY) {
                // 
            } elseif($key == UserEnum::USER_ZIP_CODE) {
                // 
            } elseif($key == UserEnum::USER_COUNTRY) {
                // 
            } elseif($key == UserEnum::USER_PHONE) {
                // 
            } elseif($key == UserEnum::USER_EMAIL) {
                // 
            } elseif($key == UserEnum::USER_PASSWORD) {
                // 
            }
        }

        return $fields;
    }

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
    public function updateUser(User $user, array $fields) : User {
        return $user;
    }
}