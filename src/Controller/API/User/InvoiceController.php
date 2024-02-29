<?php

namespace App\Controller\API\User;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user', name: 'api_user_')]
class InvoiceController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;
    private InvoiceRepository $invoiceRepository;

    function __construct(
        Security $security,
        SerializeManager $serializeManager,
        InvoiceRepository $invoiceRepository
    ) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
        $this->invoiceRepository = $invoiceRepository;
    }

    /**
     * Route used to get all invoice of an user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/invoices', name: 'get_invoices', methods: ["GET"])]
    public function get_invoices(Request $request): JsonResponse {
        $limit = 20;
        $offset = $request->get("offset");
        $offset = is_numeric($offset) && $offset > 0 ? $offset : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil(0 / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->invoiceRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    /**
     * Route used to get an invoice of an user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/invoice/{invoiceID}', name: 'get_invoice', methods: ["GET"])]
    public function get_invoice(Request $request, int $invoiceID) : JsonResponse {
        $invoice = $this->invoiceRepository->find($invoiceID);
        if(!$invoice) {
            return $this->json([
                "message" => "Not found invoice"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => $this->serializeManager->serializeContent($invoice)
        ], Response::HTTP_OK);
    }

    /**
     * Route used to download an invoice of an user. Only a user (ROLE_USER) can access to this route
     */
    #[Route('/invoice/{invoiceID}/download', name: 'get_invoice_download', methods: ["GET"])]
    public function get_invoice_download(Request $request, int $invoiceID) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
