<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Manager\CategoryManager;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/admin', name: 'api_admin_')]
class CategoryController extends AbstractController
{
    private User $user;
    private CategoryManager $categoryManager;
    private ProductRepository $productRepository;
    private CategoryRepository $categoryRepository;

    function __construct(
        Security $security, 
        CategoryManager $categoryManager, 
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->user = $security->getUser();
        $this->categoryManager = $categoryManager;
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/category', name: 'post_category', methods: ["POST"])]
    public function post_category(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->categoryManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->categoryManager->fillCategory($fields);
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

    #[Route('/category/{categoryID}', name: 'update_category', methods: ["PUT", "UPDATE"])]
    public function update_category(Request $request, int $categoryID): JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(!$category) {
            return $this->json([
                "message" => "The category counld't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->categoryManager->checkFields($jsonContent);
            if(!$fields) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body"
                ], Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->categoryManager->fillCategory($fields, $category);
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

    #[Route('/category/{categoryID}/remove', name: 'delete_category', methods: ["DELETE"])]
    public function delete_category(Request $request, int $categoryID): JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(!$category) {
            return $this->json([
                "message" => "The category counld't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            foreach($category->getProducts() as $product) {
                $category->removeProduct($product);
                $this->productRepository->save($product, true);
            }

            $this->categoryRepository->remove($category, true);
        } catch(\Exception $e) {
            return $this->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_OK);
    }
}
