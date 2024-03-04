<?php

namespace App\Manager;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\ProductRepository;

class CommentManager {

    private ProductRepository $productRepository;
    private CommentRepository $commentRepository;

    function __construct(ProductRepository $productRepository, CommentRepository $commentRepository) {
        $this->productRepository = $productRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * 
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];

        return $fields;
    }

    /**
     * 
     */
    public function fillComment(array $fields, ?Comment $comment = new Comment()) : Comment {
        return $comment;
    }
}