<?php

namespace App\Controller\API;

use App\Enum\ContactEnum;
use App\Manager\MailManager;
use App\Manager\ContactManager;
use App\Repository\ContactRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    private MailManager $mailManager;
    private ContactManager $contactManager;
    private ContactRepository $contactRepository;
    
    function __construct(
        MailManager $mailManager,
        ContactManager $contactManager, 
        ContactRepository $contactRepository
    ) {
        $this->mailManager = $mailManager;
        $this->contactManager = $contactManager;
        $this->contactRepository = $contactRepository;
    }

    #[Route('/contact', name: 'post_contact', methods: ["POST"])]
    public function post_contact(Request $request): JsonResponse
    {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            $fields = $this->contactManager->checkFields($jsonContent);
            if(!$fields) {
                throw new \Exception("");
            }

            $response = $this->contactManager->fillContact($fields);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            // Send email to the team
            $this->mailManager->sendMailWithTemplate("admin", "staff@ecommerce.com", $fields[ContactEnum::CONTACT_MESSAGE], $fields[ContactEnum::CONTACT_MESSAGE]);
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }
}
