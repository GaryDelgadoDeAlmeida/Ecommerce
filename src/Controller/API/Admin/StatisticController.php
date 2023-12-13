<?php

namespace App\Controller\API\Admin;

use App\Repository\ProductRepository;
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
    private ProductRepository $productRepository;

    public function __construct(
        Security $security,
        ProductRepository $productRepository
    ) {
        $this->user = $security->getUser();
    }

    #[Route('/statistic', name: 'get_statistics')]
    public function get_statistics(Request $request): JsonResponse {
        // Top product selled ??? Monthly or Current year ???

        // Top Buyer

        // Month benefit

        // Year benefit ??? Usefull ???

        // Return an response to the client
        return $this->json("Route under construction", Response::HTTP_OK);
    }
}
