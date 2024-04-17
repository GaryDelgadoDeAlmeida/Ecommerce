<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\Characteristic;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $currentTime = new \DateTimeImmutable();

        for($i = 0; $i <= 100; $i++) {
            $product = (new Product())
                // ->setBrand()
                // ->setCategory()
                ->setName("Produit n°{$i}")
                ->setDescription("Une description de produit typique")
                ->setPrice(100.00)
                ->setIsDeleted(false)
                ->setCreatedAt($currentTime)
            ;
            $manager->persist($product);
            $manager->flush();
            
            $randomLength = rand(1, 10);
            for($j = 0; $j <= $randomLength; $i++) {
                $characteristic = (new Characteristic())
                    ->setProduct($product)
                    ->setLabel("Characteristic n°{$j}")
                    ->setDescription("Une description typique")
                ;
                $manager->persist($characteristic);
                $manager->flush();
            }
        }
    }
}
