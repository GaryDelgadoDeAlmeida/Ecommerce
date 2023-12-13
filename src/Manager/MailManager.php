<?php

namespace App\Manager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MailManager extends AbstractController {

    private $no_reply = "no-reply@e-commerce.com";

    public function sendMailWithTemplate(string $type, string $to, string $subject, string $message) {
        $html = $this->renderView("mail/{$type}.html.twig", [
            "to" => $to,
            "subject" => $subject,
            "message" => $message
        ]);
        return false;
    }

    public function sendMailWithoutTemplate(string $to, string $subject, string $message) {
        return false;
    }

    private function sendMail(string $to, string $subject, string $message) {
        $isSend = true;

        if(!mail($to, "", "", ["From" => $this->no_reply])) {
            $isSend = false;
        }

        return $isSend;
    }
}