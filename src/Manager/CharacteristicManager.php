<?php

namespace App\Manager;

use App\Entity\Product;
use App\Entity\Characteristic;
use App\Repository\CharacteristicRepository;

class CharacteristicManager {

    private CharacteristicRepository $characteristicRepository;
    
    function __construct(CharacteristicRepository $characteristicRepository) {
        $this->characteristicRepository = $characteristicRepository;
    }

    /**
     * 
     */
    public function fillCharacteristic(array $fields, Product $product, ?Characteristic $characteristic = new Characteristic()) : Characteristic|string {
        try {
            $characteristic
                ->setProduct($product)
                ->setLabel($fields["label"])
                ->setDescription($fields["description"])
            ;

            $this->characteristicRepository->save($characteristic, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }
    }
}