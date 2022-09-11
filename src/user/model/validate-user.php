<?php

    session_start();

    if(!isset($_SESSION['ID']) && !isset($_SESSION['LOGIN'])){
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Você não está autenticado para utilizar o sistema, por favor realize o login.'
        );
    }else{
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Seja bem vindo, '.$_SESSION['NAME'].' ao sistema para coleta de dados antropométricos.'
        );
    }

    echo json_encode($dados);