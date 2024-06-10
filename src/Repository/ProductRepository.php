<?php

namespace App\Repository;

use App\Entity\Product;
use App\Entity\Category;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

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
    public function getProductsByParameters(array $filters, int $offset, int $limit) {
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
            ->orderBy("product.name", "ASC", "product.createdAt", "DESC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return Product[]
     */
    public function getBestSellers(int $offset, int $limit) : array {
        return $this->createQueryBuilder("product")
            ->select("product.id, product.name, orderDetail.id, SUM(orderDetail.quantity) as totalSelledQuantity")
            ->leftJoin("product.orderDetails", "orderDetail")
            ->groupBy("orderDetail.id")
            ->orderBy("product.id")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return Product[]
     */
    public function getMonthBestSellers(\DateTimeImmutable $time) : array {
        return $this->createQueryBuilder("product")
            ->select("product.id, product.name, orderDetail.id, SUM(orderDetail.quantity) as totalSelledQuantity")
            ->leftJoin("product.orderDetails", "orderDetail")
            ->groupBy("orderDetail.id, orderDetail.createdAt")
            ->having("orderDetail.createdAt = :time")
            ->orderBy("product.id")
            ->setParameter("time", $time->format("Y-m"))
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
     * @return int
     */
    public function countProductsCategory(Category $category) : int {
        return $this->createQueryBuilder("product")
            ->select("COUNT(product.id) as nbrProducts")
            ->where("product.category = :category")
            ->setParameter("category", $category)
            ->getQuery()
            ->getSingleResult()["nbrProducts"]
        ;
    }

    /**
     * @return int
     */
    public function countBestSellers() : int {
        return $this->createQueryBuilder("product")
            ->select("COUNT(product.id) as nbrProducts, orderDetail.id, SUM(orderDetail.quantity) as totalSelledQuantity")
            ->leftJoin("product.orderDetails", "orderDetail")
            ->groupBy("orderDetail.id")
            ->orderBy("product.id")
            ->getQuery()
            ->getOneOrNullResult()["nbrProducts"] ?? 0
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
