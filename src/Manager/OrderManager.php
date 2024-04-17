<?php

namespace App\Manager;

use App\Entity\User;
use App\Entity\Order;
use App\Entity\Product;
use App\Enum\OrderEnum;
use App\Entity\OrderDetail;
use App\Enum\OrderDetailEnum;
use App\Repository\OrderRepository;
use App\Enum\OrderDeliveryStatusEnum;
use App\Repository\OrderDetailRepository;

class OrderManager {
    
    private OrderRepository $orderRepository;
    private OrderDetailRepository $orderDetailRepository;

    public function __construct(OrderRepository $orderRepository, OrderDetailRepository $orderDetailRepository) {
        $this->orderRepository = $orderRepository;
        $this->orderDetailRepository = $orderDetailRepository;
    }

    /**
     * @@param array json content (sended json body)
     * @return array checked fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedChoices = OrderEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedChoices)) {
                continue;
            }
            
            if($fieldName == OrderEnum::ORDER_CLIENT) {
                // 
            } elseif($fieldName == OrderEnum::ORDER_STATUS) {
                // 
            } elseif($fieldName == OrderEnum::ORDER_PAID_STATUS) {
                // 
            } elseif($fieldName == OrderEnum::ORDER_DETAILS) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array json content
     * @return array fields
     */
    public function checkOrderDetails(array $jsonContent) : array {
        $fields = [];
        $allowedChoices = OrderDetailEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedChoices)) {
                continue;
            }
        
            if($fieldName == OrderDetailEnum::ORDER_DETAIL_ORDER) {
                // 
            } elseif($fieldName == OrderDetailEnum::ORDER_DETAIL_PRODUCT) {
                // 
            } elseif($fieldName == OrderDetailEnum::ORDER_DETAIL_QUANTITY) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param User user
     * @param ?Order order
     * @return Order|string
     */
    public function fillOrder(array $fields, User $user, ?Order $order = new Order()): Order|string {
        $currentTime = new \DateTimeImmutable();

        if($order->getId()) {
            $order
                ->setUpdatedAt($currentTime)
            ;
        } else {
            $order
                ->setClient($user)
                ->setCreatedAt($currentTime)
            ;
        }

        try {
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == OrderEnum::ORDER_CLIENT) {
                    // 
                } elseif($fieldName == OrderEnum::ORDER_STATUS) {
                    // 
                } elseif($fieldName == OrderEnum::ORDER_PAID_STATUS) {
                    // 
                } elseif($fieldName == OrderEnum::ORDER_DETAILS) {
                    // 
                }
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $order;
    }

    /**
     * @param array fields
     * @param ?Order order
     * @param ?OrderDetail order detail
     * @return OrderDetail|string
     */
    public function fillOrderDetail(array $fields, ?Order $order, ?OrderDetail $orderDetail = new OrderDetail()) : OrderDetail|string {
        $currentTime = new \DateTimeImmutable();
        if(!$orderDetail->getId()) {
            $orderDetail
                ->setClientOrder($order)
                ->setCreatedAt($currentTime)
            ;
        }

        try {
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == OrderDetailEnum::ORDER_DETAIL_PRODUCT) $orderDetail->setProduct($fieldValue);
                elseif($fieldName == OrderDetailEnum::ORDER_DETAIL_QUANTITY) $orderDetail->setQuantity($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $orderDetail;
    }

    /**
     * @param Order
     */
    public function cancelOrder(Order $order) : Order {
        try {
            $order->setStatus(OrderDeliveryStatusEnum::STATUS_CANCELLED);

            $this->orderRepository->save($order, true);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $order;
    }
}