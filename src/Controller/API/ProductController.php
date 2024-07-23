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
    public function get_products(Request $request): JsonResponse {
        $limit = 25;
        $filters = $request->get("filters", []);
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? (int)$request->get("offset") : 1;
        
        $products = [];
        if($filters) {
            $maxOffset = ceil( $this->productRepository->counttProductsByParamaters($filters) / $limit );
            $product = $this->productRepository->getProductsByParameters($filters, $offset, $limit);
        } else {
            $maxOffset = ceil( $this->productRepository->countProducts() / $limit );
            $products = $this->productRepository->findBy(["isDeleted" => false], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);
        }

        return $this->json([
            "offset" => $offset,
            "limit" => $limit,
            "maxOffset" => $maxOffset,
            "results" => $this->serializeManager->serializeContent($products)
        ], Response::HTTP_OK);
    }

    #[Route('/products/best-sellers', name: 'get_best_sellers', methods: ["GET"])]
    public function get_best_sellers(Request $request) : JsonResponse {
        $limit = 25;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? intval($offset) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->productRepository->countBestSellers() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->productRepository->getBestSellers($offset, $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/product/{product_id}", name: "get_product", methods: ["GET"])]
    public function get_product(int $product_id) : JsonResponse {
        $product = $this->productRepository->find($product_id);
        if(!$product) {
            return $this->json([
                "message" => "Product not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($product), 
            Response::HTTP_OK
        );
    }
}
