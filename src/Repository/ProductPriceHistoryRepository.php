<?php

namespace App\Repository;

use App\Entity\ProductPriceHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductPriceHistory>
 *
 * @method ProductPriceHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductPriceHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductPriceHistory[]    findAll()
 * @method ProductPriceHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductPriceHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductPriceHistory::class);
    }
    
    public function save(ProductPriceHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ProductPriceHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
