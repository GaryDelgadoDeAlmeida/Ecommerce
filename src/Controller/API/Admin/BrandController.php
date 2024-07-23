<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Manager\BrandManager;
use App\Manager\SerializeManager;
use App\Repository\BrandRepository;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/admin', name: 'api_admin_')]
class BrandController extends AbstractController
{
    private User $user;
    private BrandManager $brandManager;
    private SerializeManager $serializeManager;
    private BrandRepository $brandRepository;
    private ProductRepository $productRepository;

    function __construct(
        Security $security, 
        BrandManager $brandManager,
        SerializeManager $serializeManager, 
        BrandRepository $brandRepository,
        ProductRepository $productRepository
    ) {
        $this->user = $security->getUser();
        $this->brandManager = $brandManager;
        $this->serializeManager = $serializeManager;
        $this->brandRepository = $brandRepository;
        $this->productRepository = $productRepository;
    }
    
    #[Route('/brands', name: 'get_brands', methods: ["GET"])]
    public function get_brands(Request $request): JsonResponse {
        $option = $request->get("option", "pagined");
        $offset = $request->get("offset");
        $limit = 20;
        $response = [];
        
        if($option == "all") {
            $response = [
                "results" => $this->serializeManager->serializeContent(
                    $this->brandRepository->findAll()
                )
            ];
        } elseif($option == "pagined") {
            $response = [
                "offset" => $offset,
                "maxOffset" => ceil($this->brandRepository->countBrands() / $limit),
                "results" => $this->serializeManager->serializeContent(
                    $this->brandRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
                )
            ];
        }
        
        return $this->json($response, Response::HTTP_OK);
    }

    #[Route('/brand', name: 'post_brand', methods: ["POST"])]
    public function post_brand(Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->brandManager->checkFields($jsonContent);
            if(empty($fields)) {
                return $this->json([
                    "message" => "An error has been encountered with the sended body."
                ], Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->brandManager->fillBrand($fields);
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

    #[Route('/brand/{brandID}', name: 'get_brand', methods: ["GET"])]
    public function get_brand(Request $request, int $brandID) : JsonResponse {
        $brand = $this->brandRepository->find($brandID);
        if(!$brand) {
            return $this->json([
                "message" => "Brand not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => $this->serializeManager->serializeContent($brand)
        ], Response::HTTP_OK);
    }

    #[Route('/brand/{brandID}/update', name: 'update_brand', methods: ["PUT", "UPDATE"])]
    public function update_brand(Request $request, int $brandID) : JsonResponse {
        return $this->json([
            "message" => "Route under constructions"
        ], Response::HTTP_OK);
    }

    #[Route('/brand/{brandID}/remove', name: 'delete_brand', methods: ["DELETE"])]
    public function remove_brand(Request $request, int $brandID) : JsonResponse {
        $brand = $this->brandRepository->find($brandID);
        if(!$brand) {
            return $this->json([
                "message" => "Brand not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $brand->setIsDeleted(true);
            
            // To avoid deleting product and produce errors, i'll only set the products in deleted state
            foreach($brand->getProducts() as $product) {
                $product->setIsDeleted(true);
                $this->productRepository->save($product, true);
            }

            $this->brandRepository->save($brand, true);
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
