<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Repository\BankDetailRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_')]
class BankController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private BankDetailRepository $bankDetailRepository;

    function __construct(Security $security, BankDetailRepository $bankDetailRepository) {
        $this->user = $security->getUser();
        $this->bankDetailRepository = $bankDetailRepository;
    }

    #[Route('/bank', name: 'get_bank', methods: ["GET"])]
    public function get_bank(): JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route('/bank', name: 'post_bank', methods: ["POST"])]
    public function post_bank(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            // 
        } catch(\Exception $e) {
            return $this->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_ACCEPTED);
    }
}
