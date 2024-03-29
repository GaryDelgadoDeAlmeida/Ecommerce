<?php

namespace App\Repository;

use App\Entity\BankDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BankDetail>
 *
 * @method BankDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method BankDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method BankDetail[]    findAll()
 * @method BankDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BankDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BankDetail::class);
    }
    
    public function save(BankDetail $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(BankDetail $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
