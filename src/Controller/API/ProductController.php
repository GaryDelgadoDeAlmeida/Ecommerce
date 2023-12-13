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

    #[Route('/product', name: 'product')]
    public function get_products(Request $request): JsonResponse
    {
        $limit = 25;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") >= 1 ? $request->get("offset") : 1;

        return $this->json(
            $this->serializeManager->serializeContent(
                $this->productRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            ), 
            Response::HTTP_OK
        );
    }
}
