<?php

    session_start();

    if(!isset($_SESSION['ID']) && !isset($_SESSION['LOGIN'])){
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Você não está autenticado para utilizar o sistema, por favor realize o login.'
        );
    }else{

        $ID = $_SESSION['INSTITUICAO_ID'];

        include('../../conexao/conn.php');

        $sql = "SELECT * FROM INSTITUICAO WHERE ID = $ID";

        $resultado = $pdo->query($sql);

        if($resultado){
            $dadosEixo = array();
            while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
                $LOGO = $row['LOGO'];
            }
            
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'Seja bem vindo, '.$_SESSION['NAME'].' ao sistema para coleta de dados antropométricos.',
                'logo'=> $LOGO,
                'acesso'=> $_SESSION['TYPE']
            );
        } else {
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Não foi possível obter o registro solicitado.',
                'dados' => array()
            );
        }
    }

    echo json_encode($dados);