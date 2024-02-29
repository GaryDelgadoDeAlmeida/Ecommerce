<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route("/api/admin", name: "api_admin_")]
class OrderController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private OrderRepository $orderRepository;

    function __construct(
        Security $security,
        SerializeManager $serializeManager,
        OrderRepository $orderRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->orderRepository = $orderRepository;
    }
    
    #[Route('/order', name: "get_orders", methods: ["GET"])]
    public function get_orders(Request $request): JsonResponse {
        $offset = $request->get("offset", 1);
        $offset = is_numeric($offset) && $offset > 1 ? $offset : 1;
        $limit = 20;

        return $this->json(
            $this->serializeManager->serializeConten(
                $this->orderRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            ), 
            Response::HTTP_OK
        );
    }

    #[Route("/order", name: "post_order", methods: ["POST"])]
    public function post_order(Request $request) : JsonResponse {
        
        // Decode the JSON content into an array
        $jsonContent = json_decode($request->getContent());
        if(!$jsonContent) {
            return $this->json("Empty body", Response::HTTP_PRECONDITION_FAILED);
        }

        return $this->json("Route under construction", Response::HTTP_OK);
    }

    #[Route("/order/{orderID}", name: "get_order", methods: ["GET"])]
    public function get_order(Request $request, int $orderID) : JsonResponse {
        $order = $this->orderRepository->find($orderID);
        if(empty($order)) {
            return $this->json("", Response::HTTP_NOT_FOUND);
        }

        return $this->json("Route under construction", Response::HTTP_OK);
    }

    #[Route("/order/{orderID}/update", name: "update_order", methods: ["UPDATE", "PUT"])]
    public function update_order(Request $request, int $orderID) : JsonResponse {
        return $this->json("Route under construction", Response::HTTP_OK);
    }

    #[Route("/order/{orderID}/remove", name: "remove_order", methods: ["DELETE"])]
    public function delete_order(int $orderID) : JsonResponse {
        return $this->json("Route under construction", Response::HTTP_OK);
    }
}