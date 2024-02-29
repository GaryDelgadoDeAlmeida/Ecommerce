<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route("/api", name: "api_")]
class ProductController extends AbstractController
{
    private SerializeManager $serializeManager;
    private ProductRepository $productRepository;

    public function __construct(
        SerializeManager $serializeManager,
        ProductRepository $productRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->productRepository = $productRepository;
    }

    #[Route('/products', name: 'get_products', methods: ["GET"])]
    public function get_products(Request $request): JsonResponse
    {
        $limit = 25;
        $filters = $request->get("filters", []);
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? $request->get("offset") : 1;
        
        $products = [];
        if($filters) {
            $maxOffset = ceil( $this->productRepository->counttProductsByParamaters($filters) / $limit );
            $product = $this->productRepository->getProductsByParamaters($filters, $offset, $limit);
        } else {
            $maxOffset = ceil( $this->productRepository->countProducts() / $limit );
            $products = $this->productRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit);
        }

        return $this->json([
            "offset" => $offset,
            "limit" => $limit,
            "maxOffset" => $maxOffset,
            "results" => $this->serializeManager->serializeContent($products)
        ], Response::HTTP_OK);
    }

    #[Route("/product/{product_id}", name: "get_product", methods: ["GET"])]
    public function get_product(int $product_id) : JsonResponse {
        $product = $this->productRepository->find($product_id);
        if(!$product) {
            return $this->json("Product not found", Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($product), 
            Response::HTTP_OK
        );
    }
}
