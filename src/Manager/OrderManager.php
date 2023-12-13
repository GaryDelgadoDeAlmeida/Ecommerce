<?php

namespace App\Manager;

use App\Entity\User;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\OrderDetail;
use App\Repository\OrderRepository;
use App\Repository\OrderDetailRepository;

class OrderManager {
    
    private OrderRepository $orderRepository;
    private OrderDetailRepository $orderDetailRepository;

    public function __construct(OrderRepository $orderRepository, OrderDetailRepository $orderDetailRepository) {
        $this->orderRepository = $orderRepository;
        $this->orderDetailRepository = $orderDetailRepository;
    }

    /**
     * @param User user
     * @param string The status of the order. Normally it will be the 1st step
     * @param string The paid status, if the customer paid his order
     * @return Order
     */
    public function postOrder(User $user, string $status, string $paid_status) : Order {
        $order = (new Order())
            ->setClient($user)
            ->setStatus($status)
            ->setPaidStatus($paid_status)
            ->setUpdatedAt(new \DateTimeImmutable())
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        $this->orderRepository->save($order, true);

        return $order;
    }

    /**
     * @param Order order
     * @param Product product
     * @param int quantity
     * @return OrderDetail
     */
    public function addOrderDetail(Order $order, Product $product, int $quantity) : OrderDetail {
        $orderDetail = (new OrderDetail())
            ->setClientOrder($order)
            ->setProduct($product)
            ->setQuantity($quantity)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        $this->orderDetailRepository->save($orderDetail, true);

        return $orderDetail;
    }
}