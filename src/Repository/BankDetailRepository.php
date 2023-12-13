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

//    /**
//     * @return BankDetail[] Returns an array of BankDetail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?BankDetail
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
