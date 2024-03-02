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

    public function save(Product $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Product $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
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

    /**
     * @return int
     */
    public function countProducts() {
        return $this->createQueryBuilder("product")
            ->select("COUNT(product.id) as nbrProducts")
            ->getQuery()
            ->getSingleResult()["nbrProducts"]
        ;
    }

    /**
     * @param Category
     * @return Category
     */
    public function countProductsCategory(Category $category) : int {
        // 
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
