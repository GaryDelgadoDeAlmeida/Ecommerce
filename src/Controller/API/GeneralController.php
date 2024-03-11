<?php

namespace App\Controller\API;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class GeneralController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function anonymous_home(Request $request): JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
