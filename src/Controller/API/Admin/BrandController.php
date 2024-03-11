<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Repository\BrandRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/admin', name: 'api_admin_')]
class BrandController extends AbstractController
{
    private User $user;
    private BrandRepository $brandRepository;

    function __construct(Security $security, BrandRepository $brandRepository) {
        $this->user = $security->getUser();
        $this->brandRepository = $brandRepository;
    }
    
    #[Route('/brands', name: 'get_brands', methods: ["GET"])]
    public function get_brands(Request $request): JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }

    #[Route('/brand', name: 'post_brand', methods: ["POST"])]
    public function post_brand(Request $request) : JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }

    #[Route('/brand/{brandID}', name: 'get_brand', methods: ["GET"])]
    public function get_brand(Request $request, int $brandID) : JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }

    #[Route('/brand/{brandID}/update', name: 'update_brand', methods: ["PUT", "UPDATE"])]
    public function update_brand(Request $request, int $brandID) : JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }

    #[Route('/brand/{brandID}/remove', name: 'delete_brand', methods: ["DELETE"])]
    public function remove_brand(Request $request, int $brandID) : JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }
}
