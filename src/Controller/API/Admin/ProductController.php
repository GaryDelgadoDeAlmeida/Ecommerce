<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Enum\ProductEnum;
use App\Manager\ProductImageManager;
use App\Manager\ProductManager;
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
    private ProductManager $productManager;
    private SerializeManager $serializeManager;
    private ProductImageManager $productImageManager;
    private BrandRepository $brandRepository;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(
        Security $security,
        ProductManager $productManager,
        SerializeManager $serializeManager,
        ProductImageManager $productImageManager,
        BrandRepository $brandRepository,
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->productManager = $productManager;
        $this->serializeManager = $serializeManager;
        $this->productImageManager = $productImageManager;
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

    #[Route("/product", name: "post_product", methods: ["POST"])]
    public function post_product(Request $request) : JsonResponse {
        // Decode the JSON content into an array
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->productManager->checkFields($jsonContent);
            if(empty($fields)) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $response = $this->productManager->fillProduct($fields);
            if(is_string($response)) {
                return $this->json([
                    "message" => $response
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
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

    #[Route("/product/{productID}/update", name: "update_product", methods: ["POST", "UPDATE", "PUT"])]
    public function update_product(Request $request, int $productID) : JsonResponse {
        $jsonContent = [
            "brand" => $request->request->get("brand", null),
            "category" => $request->request->get("category", null),
            "name" => $request->request->get("name", null),
            "description" => $request->request->get("description", null),
            "quantity" => $request->request->get("quantity", null),
            "price" => $request->request->get("price", null),
            "characteristics" => $request->request->get("characteristics", null),
            "image" => $request->files->get("image", null),
            "previews" => $request->files->get("previews", null)
        ];

        $product = $this->productRepository->find($productID);
        if(empty($product)) {
            return $this->json([
                "message" => "Product not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->productManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ]);
            }

            $response = $this->productManager->fillProduct($fields, $product);
            if(is_string($response)) {
                return $this->json([
                    "message" => $response
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Save change on the product into database
            $this->productRepository->save($product, true);

            // Save product image & previews
            $response = $this->productImageManager->saveProductPreviews(
                array_merge(
                    [isset($fields[ProductEnum::PRODUCT_IMAGE]) ? $fields[ProductEnum::PRODUCT_IMAGE] : null], 
                    $fields[ProductEnum::PRODUCT_PREVIEWS] ?? []
                ), 
                $product, 
                $this->getParameter("products_img_dir")
            );
            if(is_string($response)) {
                return $this->json([
                    "message" => $response
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
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
