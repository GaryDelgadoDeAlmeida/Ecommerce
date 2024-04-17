<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Manager\MailManager;
use App\Manager\OrderManager;
use App\Manager\SerializeManager;
use App\Repository\OrderRepository;
use App\Enum\OrderDeliveryStatusEnum;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class OrderController extends AbstractController
{
    private User $user;
    private MailManager $mailManager;
    private OrderManager $orderManager;
    private SerializeManager $serializeManager;
    private OrderRepository $orderRepository;

    function __construct(
        Security $security,
        MailManager $mailManager,
        OrderManager $orderManager,
        SerializeManager $serializeManager,
        OrderRepository $orderRepository
    ) {
        $this->user = $security->getUser();
        $this->mailManager = $mailManager;
        $this->orderManager = $orderManager;
        $this->serializeManager = $serializeManager;
        $this->orderRepository = $orderRepository;
    }

    #[Route('/orders/history', name: 'get_orders_history', methods: ["GET"])]
    public function orders_history(Request $request): JsonResponse {
        $limit = 10;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? $request->get("offset") : 1;

        $orders = $this->orderRepository->findBy([
            "client" => $this->user, 
            "status" => OrderDeliveryStatusEnum::STATUS_DELIVERED
        ], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->orderRepository->countUserOrders($this->user, OrderDeliveryStatusEnum::STATUS_DELIVERED) / $limit),
            "results" => $this->serializeManager->serializeContent($orders)
        ], Response::HTTP_OK);
    }

    #[Route("/orders/ongoing", name: "get_orders_ongoing", methods: ["GET"])]
    public function orders_ongoing(Request $request) : JsonResponse {
        $limit = 25;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? $request->get("offset") : 1;

        $orders = $this->orderRepository->findBy([
            "client" => $this->user, 
            "status" => [OrderDeliveryStatusEnum::STATUS_WAITING, OrderDeliveryStatusEnum::STATUS_ONGOING]
        ], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => 0,
            "results" => $this->serializeManager->serializeContent($orders)
        ], Response::HTTP_OK);
    }

    #[Route("/order", name: "post_order", methods: ["POST"])]
    public function post_order(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $new_order = null;
        
        try {
            $fields = $this->orderManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $this->orderManager->fillOrder($fields);
        } catch(\Exception $e) {
            return $this->json(
                $e->getMessage(), 
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return $this->json($new_order, Response::HTTP_CREATED);
    }

    #[Route("/order/{orderID}", name: "get_order", methods: ["GET"])]
    public function get_order(Request $request, int $orderID) : JsonResponse {
        $order = $this->orderRepository->findOneBy(["id" => $orderID, "client" => $this->user]);
        if(!$order) {
            return $this->json([
                "message" => "Order not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => $this->serializeManager->serializeContent($order)
        ], Response::HTTP_OK);
    }

    /**
     * Route used to cancel an order of an user. Naturally, in function of the progress of the
     * order, a tax can be used. For example, if the order is about to be delivered to the user, 
     * the user will have to pay the return
     */
    #[Route("/order/{orderID}/cancel", name: "cancel_order", methods: ["POST"])]
    public function cancel_order(Request $request, int $orderID) : JsonResponse {
        $order = $this->orderRepository->findOneBy(["id" => $orderID, "client" => $this->user]);
        if(!$order) {
            return $this->json([
                "message" => "Order not found"
            ], Response::HTTP_NOT_FOUND);
        }

        if($order->getStatus() == OrderDeliveryStatusEnum::STATUS_CANCELLED) {
            return $this->json([
                "message" => "Your order has been already cancelled."
            ], Response::HTTP_ALREADY_REPORTED);
        }

        $response = $this->orderManager->cancelOrder($order);
        if(is_string($response)) {
            return $this->json([
                "message" => $response
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
