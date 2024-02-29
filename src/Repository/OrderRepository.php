<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 *
 * @method Order|null find($id, $lockMode = null, $lockVersion = null)
 * @method Order|null findOneBy(array $criteria, array $orderBy = null)
 * @method Order[]    findAll()
 * @method Order[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    /**
     * @param User user
     * @param string status
     * @return int
     */
    public function countUserOrder(User $user, string $status) : int {
        return $this->createQueryBuilder("order")
            ->select("COUNT(order.id) as nbrOrders")
            ->where("order.user = :user")
            ->andWhere("order.status = :status")
            ->setParameters([
                "user" => $user,
                "status" => $status
            ])
            ->getQuery()
            ->getResult()["nbrOrders"]
        ;
    }
}
