<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/{level0}', name: 'app_index', defaults: ["level0" => null])]
    #[Route('/user/{level1}', name: 'app_user', defaults: ["level1" => null])]
    #[Route('/user/{level1}/{level2}', name: 'app_user', defaults: ["level1" => null, "level2" => null])]
    #[Route('/admin/{level1}', name: 'app_admin', defaults: ["level1" => null])]
    #[Route('/admin/{level1}/{level2}', name: 'app_admin', defaults: ["level1" => null, "level2" => null])]
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }
}
