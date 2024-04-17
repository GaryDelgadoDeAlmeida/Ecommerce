<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\BrandRepository;
use App\Repository\OrderRepository;
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
    private OrderRepository $orderRepository;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(
        Security $security,
        UserRepository $userRepository,
        BrandRepository $brandRepository,
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->userRepository = $userRepository;
        $this->brandRepository = $brandRepository;
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/statistics', name: 'get_statistics')]
    public function get_statistics(Request $request): JsonResponse {
        $currentTime = new \DateTimeImmutable();

        // Top product selled ??? Monthly or Current year ???

        // Top Buyer

        // Month benefit

        // Year benefit ??? Usefull ???

        // Return an response to the client
        return $this->json([
            "nbrCustomers" => $this->userRepository->countUsers(),
            "nbrOrders" => $this->orderRepository->countOrders(),
            "nbrProducts" => $this->productRepository->countProducts(),
            "nbrBrands" => $this->brandRepository->countBrands(),
            "salesReport" => [],
            "activeUsers" => [],
            "topSellingProducts" => $this->productRepository->getMonthBestSellers($currentTime),
            "topSellingCategories" => [], // Max selled products in a category
            "newCustomers" => $this->userRepository->findBy([], ["createdAt" => "DESC"], 5, 0)
        ], Response::HTTP_OK);
    }
}
