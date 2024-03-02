<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
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

    /**
     * Route used to display all categories to the public user to simplify access to a specific product category
     */
    #[Route('/categories', name: 'get_categories', methods: ["GET"])]
    public function get_categories(Request $request): JsonResponse
    {
        $limit = 20;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? $offset : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->categoryRepository->countCategories() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->categoryRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    /**
     * Route used to display of products of a selected category
     */
    #[Route('/category/{categoryID}', name: 'get_category', methods: ["GET"])]
    public function get_category(Request $request, int $categoryID) : JsonResponse 
    {
        $category = $this->categoryRepository->find($categoryID);
        if(!$category) {
            return $this->json([
                "message" => "Not Found category"
            ], Response::HTTP_NOT_FOUND);
        }

        $limit = 20;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? $offset : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->productRepository->countProductsCategory($category) / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->productRepository->findBy(["category" => $category], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }
}
