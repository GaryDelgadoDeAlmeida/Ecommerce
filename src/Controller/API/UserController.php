<?php

namespace App\Controller\API;

use App\Manager\UserManager;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    private UserManager $userManager;
    private UserRepository $userRepository;

    function __construct(UserManager $userManager, UserRepository $userRepository) {
        $this->userManager = $userManager;
        $this->userRepository = $userRepository;
    }

    #[Route('/register', name: 'post_account', methods: ["POST"])]
    public function post_account(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->userManager->checkFields($jsonContent);
            if(!$fields) {
                throw new \Exception();
            }

            $user = $this->userManager->fillUser($fields);
            if(is_string($user)) {
                throw new \Exception();
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }
}
