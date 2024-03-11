<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class CommentController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private CommentRepository $commentRepository;
    
    function __construct(
        Security $security, 
        SerializeManager $serializeManager, 
        CommentRepository $commentRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->commentRepository = $commentRepository;
    }

    #[Route('/comments', name: 'get_comment', methods: ["GET"])]
    public function get_comments(Request $request) : JsonResponse {
        $limit = 20;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? intval($offset) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->commentRepository->countUserComments($this->user) / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->commentRepository->findBy(["user" => $this->user], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }
    
    #[Route('/comment', name: 'post_comment', methods: ["POST"])]
    public function post_comment(Request $request): JsonResponse {
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
