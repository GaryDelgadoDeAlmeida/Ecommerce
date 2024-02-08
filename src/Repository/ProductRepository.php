<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }
    
    /**
     * @param array filters
     * @param int offset
     * @param int limit
     */
    public function getProductsByParamters(array $filters, int $offset, int $limit) {
        $qb = $this->createQueryBuilder("product");

        if(empty($filters["search"])) {}

        if(!empty($filters["category"])) {
            $qb
                ->leftJoin("product.category", "category")
                ->andWhere("category.name = :category_name")
                ->setParameter("category_name", $filters["category"])
            ;
        }

        if(!empty($filters["brand"])) {
            $qb
                ->leftJoin("product.brand", "brand")
                ->andWher("brand.name = :brand_name")
                ->setParameter("brand_name", $filters["brand"])
            ;
        }

        if(empty($filters["price"])) {}

        return $qb
            ->orderBy("product.createdAt", "DESC", "product.name", "ASC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    public function countProducts() {
        return $this->createQueryBuilder("product")
            ->select("COUNT(product.id) as nbrProducts")
            ->getQuery()
            ->getSingleResult()["nbrProducts"]
        ;
    }

    /**
     * @param array filters
     * @return int
     */
    public function countProductsByParamters(array $filters) {
        $qb = $this->createQueryBuilder("product")
            ->select("COUNT(product.id) as nbrProducts")
        ;

        if(empty($filters["search"])) {}

        if(!empty($filters["category"])) {
            $qb
                ->leftJoin("product.category", "category")
                ->andWhere("category.name = :category_name")
                ->setParameter("category_name", $filters["category"])
            ;
        }

        if(!empty($filters["brand"])) {
            $qb
                ->leftJoin("product.brand", "brand")
                ->andWher("brand.name = :brand_name")
                ->setParameter("brand_name", $filters["brand"])
            ;
        }

        if(empty($filters["price"])) {}

        return $qb
            ->getQuery()
            ->getSingleResult()["nbrProducts"]
        ;
    }
}
