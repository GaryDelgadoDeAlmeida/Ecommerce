<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\BrandRepository;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route("/api/admin", name: "api_admin_")]
class StatisticController extends AbstractController
{
    private User $user;
    private UserRepository $userRepository;
    private BrandRepository $brandRepository;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(
        Security $security,
        UserRepository $userRepository,
        BrandRepository $brandRepository,
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->userRepository = $userRepository;
        $this->brandRepository = $brandRepository;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/statistics', name: 'get_statistics')]
    public function get_statistics(Request $request): JsonResponse {
        // Top product selled ??? Monthly or Current year ???

        // Top Buyer

        // Month benefit

        // Year benefit ??? Usefull ???

        // Return an response to the client
        return $this->json([
            "nbrUsers" => 0,
            "nbrOrders" => 0,
            "nbrProducts" => 0,
            "nbrBrands" => 0,
            "salesReport" => [],
            "activeUsers" => [],
            "topSellingProducts" => [],
            "topSellingCategories" => [], // Max selled products in a category
            "newCustomers" => []
        ], Response::HTTP_OK);
    }
}
