<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\BrandRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class FilterController extends AbstractController
{
    private SerializeManager $serializeManager;
    private BrandRepository $brandRepository;
    private CategoryRepository $categoryRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        BrandRepository $brandRepository, 
        CategoryRepository $categoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->brandRepository = $brandRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/products-filters', name: 'get_products_filters', methods: ["GET"])]
    public function get_products_filters(Request $request): JsonResponse {
        return $this->json($this->serializeManager->serializeContent([
            "categories" => $this->categoryRepository->findAll(),
            "brands" => $this->brandRepository->findAll()
        ]), Response::HTTP_OK);
    }
}
