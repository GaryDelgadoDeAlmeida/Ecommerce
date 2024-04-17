<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class GeneralController extends AbstractController
{
    private SerializeManager $serializeManager;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;
    
    function __construct(
        SerializeManager $serializeManager,
        ProductRepository $productRepository, 
        CategoryRepository $categoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }
    
    #[Route('/home', name: 'home')]
    public function anonymous_home(Request $request): JsonResponse {
        return $this->json($this->serializeManager->serializeContent([
            "categories" => $this->categoryRepository->findBy([], ["id" => "DESC"], 4, 0),
            "products" => $this->productRepository->findBy(["isDeleted" => false], ["createdAt" => "DESC"], 4, 0)
        ]), Response::HTTP_OK);
    }
}
