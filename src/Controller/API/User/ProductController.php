<?php

namespace App\Controller\API\User;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class ProductController extends AbstractController
{
    #[Route('/product', name: 'product')]
    public function index(Request $request): JsonResponse
    {
        return $this->json("Route under construction", Response::HTTP_OK);
    }
}
