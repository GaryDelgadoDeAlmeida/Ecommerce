<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Manager\UserManager;
use App\Manager\SerializeManager;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route("/api/admin", name: "api_admin_")]
class UserController extends AbstractController
{
    private User $user;
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;

    public function __construct(
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

    #[Route('/users', name: 'get_users', methods: ["GET"])]
    public function get_users(Request $request): JsonResponse {
        $limit = 20;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? $request->get("offset") : 1;

        return $this->json(
            $this->serializeManager->serializeContent(
                $this->userRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            ), 
            Response::HTTP_OK
        );
    }

    #[Route("/user", name: "post_user", methods: ["POST"])]
    public function post_user(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json("");
        }

        return $this->json("Route Under construction", Response::HTTP_OK);
    }

    #[Route("/profile", name: "get_profile", methods: ["GET"])]
    public function get_profile(Request $request) : JsonResponse {
        return $this->json(
            $this->serializeManager->serializeContent($this->user),
            Response::HTTP_OK
        );
    }

    #[Route("/user/{userID}", name: "get_user", methods: ["GET"])]
    public function get_user(Request $request, int $userID) : JsonResponse {
        $user = $this->userRepository->find($userID);
        if(empty($user)) {
            return $this->json("User not found", Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeConten($user), 
            Response::HTTP_OK
        );
    }

    #[Route("/user/{userID}/update", name: "update_user", methods: ["UPDATE", "PUT"])]
    public function update_user(Request $request, User $user) : JsonResponse {
        return $this->json("Route Under construction", Response::HTTP_OK);
    }

    #[Route("/user/{userID}/remove", name: "delete_user", methods: ["DELETE"])]
    public function delete_user(User $user) : JsonResponse {
        return $this->json("Route Under construction", Response::HTTP_OK);
    }
}
