<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class CategoryFixtures extends Fixture
{
    private array $categories = [
        [
            "name" => "Vêtement",
            "description" => "Retrouver tous vos vêtements favoris, pour les femmes, pour les hommes et même pour les enfants"
        ],
        [
            "name" => "Technologie",
            "description" => "Find every hytech products in this section"
        ],
        [
            "name" => "Alimentation",
            "description" => "Retrouver tous les produits alimentaires pour remplir votre figro a petit prix"
        ],
        [
            "name" => "Cuisine",
            "description" => "Retrouver tous les ustensiles de cuisine"
        ],
        [
            "name" => "Jeux vidéo",
            "description" => ""
        ],
        [
            "name" => "Animalerie",
            "description" => ""
        ],
        [
            "name" => "Bricolage",
            "description" => ""
        ],
        [
            "name" => "Jardinage",
            "description" => ""
        ],
        [
            "name" => "Beauté",
            "description" => ""
        ],
        [
            "name" => "Livre",
            "description" => ""
        ]
    ];

    public function load(ObjectManager $manager): void
    {
        $currentTime = new \DateTimeImmutable();

        foreach($this->categories as $category) {
            $object = (new Category())
                ->setName($category["name"])
                ->setDescription($category["description"])
                ->setCreatedAt($currentTime)
            ;

            $manager->persist($object);
            $manager->flush();
        }
    }
}
