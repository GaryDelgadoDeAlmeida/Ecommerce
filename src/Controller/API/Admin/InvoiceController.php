<?php

namespace App\Controller\API\Admin;

use App\Entity\User;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/admin', name: 'api_admin_')]
class InvoiceController extends AbstractController
{
    private User $user;
    private InvoiceRepository $invoiceRepository;

    function __construct(Security $security, InvoiceRepository $invoiceRepository) {
        $this->user = $security->getUser();
        $this->invoiceRepository = $invoiceRepository;
    }
    
    #[Route('/invoices', name: 'get_invoices', methods: ["GET"])]
    public function get_invoices(Request $request): JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
