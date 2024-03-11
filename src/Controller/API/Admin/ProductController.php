<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Manager\SerializeManager;
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
class ProductController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private BrandRepository $brandRepository;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(
        Security $security,
        SerializeManager $serializeManager,
        BrandRepository $brandRepository,
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->brandRepository = $brandRepository;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/products', name: "get_products", methods: ["GET"])]
    public function get_products(Request $request): JsonResponse {
        $offset = $request->get("offset", 1);
        $offset = is_numeric($offset) && $offset > 1 ? $offset : 1;
        $limit = 20;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->productRepository->countProducts() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->productRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route('/product/form-needs', name: "get_product_form_needs", methods: ["GET"])]
    public function get_product_form_needs(Request $request) : JsonResponse {
        return $this->json(
            $this->serializeManager->serializeContent([
                "brands" => $this->brandRepository->findAll(),
                "categories" => $this->categoryRepository->findAll()
            ]), 
            Response::HTTP_OK
        );
    }

    #[Route("/product", name: "post_product", methods: ["POST"])]
    public function post_product(Request $request) : JsonResponse {
        // Decode the JSON content into an array
        $jsonContent = json_decode($request->getContent());
        if(!$jsonContent) {
            return $this->json("Empty body", Response::HTTP_PRECONDITION_FAILED);
        }

        return $this->json("Route Under construction", Response::HTTP_OK);
    }

    #[Route("/product/{productID}", name: "get_product", methods: ["GET"])]
    public function get_product(Request $request, int $productID) : JsonResponse {
        $product = $this->productRepository->find($productID);
        if(empty($productID)) {
            return $this->json("", Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($product), 
            Response::HTTP_OK
        );
    }

    #[Route("/product/{productID}/update", name: "update_product", methods: ["UPDATE", "PUT"])]
    public function update_product(int $productID) : JsonResponse {
        // Decode the JSON content into an array
        $jsonContent = json_decode($request->getContent());
        if(!$jsonContent) {
            return $this->json("Empty body", Response::HTTP_PRECONDITION_FAILED);
        }

        $product = $this->productRepository->find($productID);
        if(empty($product)) {
            return $this->json("", Response::HTTP_NOT_FOUND);
        }

        return $this->json("Route Under construction", Response::HTTP_OK);
    }

    #[Route("/product/{productID}/remove", name: "delete_product", methods: ["DELETE"])]
    public function delete_product(int $productID) : JsonResponse {
        $product = $this->productRepository->find($productID);
        if(empty($product)) {
            return $this->json("", Response::HTTP_NOT_FOUND);
        }

        try {
            $this->productRepository->remove($product, true);
        } catch(\Exception $e) {
            return $this->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json("Route Under construction", Response::HTTP_OK);
    }
}
