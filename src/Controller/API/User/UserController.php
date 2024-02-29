<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Manager\UserManager;
use App\Manager\SerializeManager;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class UserController extends AbstractController
{
    private User $user;
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;
    
    function __construct(
        Security $security,
        UserManager $userManager,
        SerializeManager $serializeManager,
        UserRepository $userRepository
    ) {
        $this->user = $security->getUser();
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
    }

    /**
     * Route used to get the profile of the connected user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/profile', name: 'get_profile', methods: ["GET"])]
    public function get_profile(Request $request): JsonResponse
    {
        return $this->json([
            "results" => $this->serializeManager->serializeContent($this->user)
        ], Response::HTTP_OK);
    }

    /**
     * Route used to update the information the user. Only a user (ROLE_USER) can access to this route
     * Also, this route will be used to update personnal data and updating the password of the user
     */
    #[Route('/profile', name: 'get_profile', methods: ["UPDATE", "PUT"])]
    public function update_profile(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    /**
     * Route used to remove the account of the user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/profile', name: 'get_profile', methods: ["DELETE"])]
    public function remove_account(Request $request) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
