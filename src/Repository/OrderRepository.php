<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Order;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

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
     * @param Order entity
     * @param bool flush (save changes into database)
     */
    public function save(Order $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Order entity
     * @param bool flush (save chenges/remove into database)
     */
    public function remove(Order $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countOrders() : int {
        return $this->createQueryBuilder("clientOrder")
            ->select("COUNT(clientOrder.id) as nbrOrders")
            ->getQuery()
            ->setSingleResult()["nbrOrders"]
        ;
    }

    /**
     * @param User user
     * @param string status
     * @return int
     */
    public function countUserOrders(User $user, string $status) : int {
        return $this->createQueryBuilder("clientOrder")
            ->select("COUNT(clientOrder.id) as nbrOrders")
            ->where("clientOrder.client = :user")
            ->andWhere("clientOrder.status = :status")
            ->setParameters([
                "user" => $user,
                "status" => $status
            ])
            ->getQuery()
            ->getSingleResult()["nbrOrders"]
        ;
    }
}
