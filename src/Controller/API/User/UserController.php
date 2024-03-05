<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Manager\UserManager;
use App\Manager\SerializeManager;
use App\Repository\UserRepository;
use App\Repository\OrderRepository;
use App\Repository\CommentRepository;
use App\Repository\InvoiceRepository;
use App\Repository\BankDetailRepository;
use App\Repository\OrderDetailRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class UserController extends AbstractController
{
    private User $user;
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;
    private OrderRepository $orderRepository;
    private InvoiceRepository $invoiceRepository;
    private CommentRepository $commentRepository;
    private BankDetailRepository $bankDetailRepository;
    private OrderDetailRepository $orderDetailRepository;
    
    function __construct(
        Security $security,
        UserManager $userManager,
        SerializeManager $serializeManager,
        UserRepository $userRepository,
        OrderRepository $orderRepository,
        InvoiceRepository $invoiceRepository,
        CommentRepository $commentRepository,
        BankDetailRepository $bankDetailRepository,
        OrderDetailRepository $orderDetailRepository
    ) {
        $this->user = $security->getUser();
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
        $this->orderRepository = $orderRepository;
        $this->invoiceRepository = $invoiceRepository;
        $this->commentRepository = $commentRepository;
        $this->bankDetailRepository = $bankDetailRepository;
        $this->orderDetailRepository = $orderDetailRepository;
    }

    /**
     * Route used to get the profile of the connected user. Only a user (ROLE_USER) can access to this route
     * 
     * eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk2MzMzNjIsImV4cCI6MTcwOTYzNjk2Miwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImdhcnkuYWxtZWlkYS53b3JrQGdtYWlsLmNvbSJ9.iQWvnyBjsYG6-AxJ8P3ocxvzUsj2xr3PFzja07RBsO8YGsehCcWD-5q0xjVb8uT3cQRtsFGgsrLpmKRTHEwyTL71k11OhAee49n-E3136-nOfMPFTzo2xZO4GXWunjK8Ysnmy1OWI7Bgufd39v8AkrZsS_KuNQkQHNUE3aPBpQltebhyhkBLqayK0YvECbT8ehi2C31anwx3IGTABHdxz5dYrBYrVtG13pRZ8Jl0C2YgiMqOf0biguLry6bGDexQ5NTUnwSzvDF7lR_lYqptbAT8jDPf-wmYQd8wTxqJrNb-y5tRs3mVAMA1DHPsa52t12EpSrqoi-ai6KijviZkLA
     */
    #[Route('/profile', name: 'get_profile', methods: ["GET"])]
    public function get_profile(Request $request): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent($this->user)
        ], Response::HTTP_OK);
    }

    /**
     * Route used to update the information the user. Only a user (ROLE_USER) can access to this route
     * Also, this route will be used to update personnal data and updating the password of the user
     */
    #[Route('/profile', name: 'update_profile', methods: ["UPDATE", "PUT"])]
    public function update_profile(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $fields = $this->userManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_PRECONDITION_REQUIRED);
            }

            $response = $this->userManager->fillUser($fields, $this->user);
            if(is_string($response)) {
                return $this->json([
                    "message" => $response
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    /**
     * Route used to desactivate an account of the connected user. Only a user (ROLE_USER) can access to this route
     * Desactivating an account will not impact ongoing orders or any comments or bank detail (see if we should to
     * remove it)
     */
    #[Route('/profile/desactivate', name: 'desactivate_profile', methods: ["DELETE"])]
    public function desactive_account(Requesst $request) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
        // return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Route used to remove the account of the user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/profile', name: 'remove_profile', methods: ["DELETE"])]
    public function remove_account(Request $request) : JsonResponse {
        $orders = $this->user->getOrders();
        $comments = $this->user->getComments();
        $bankDetails = $this->bankDetailRepository->findBy(["client" => $this->user]);

        try {
            foreach($orders as $order) {
                $orderDetails = $order->getOrderDetails();
                $invoice = $order->getInvoice();

                foreach($orderDetails as $orderDetail) {
                    $this->orderDetailRepository->remove($orderDetail, true);
                }

                // Remove invoice pdf file

                // Remove invoice object from database
                $this->invoiceRepository->remove($invoice, true);

                // Remove order
                $this->orderRepository->remove($order, true);
            }
    
            foreach($comments as $comment) {
                $this->commentRepository->remove($comment, true);
            }
    
            foreach($bankDetails as $bankDetail) {
                $this->bankDetailRepository->remove($bankDetail, true);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
