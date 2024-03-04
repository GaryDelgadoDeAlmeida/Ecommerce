<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class CommentController extends AbstractController
{
    private User $user;
    private CommentRepository $commentRepository;
    
    function __construct(Security $security, CommentRepository $commentRepository) {
        $this->user = $security->getUser;
        $this->commentRepository = $commentRepository;
    }
    
    #[Route('/comment', name: 'post_comment', methods: ["POST"])]
    public function post_comment(Request $request): JsonResponse
    {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            // 
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
