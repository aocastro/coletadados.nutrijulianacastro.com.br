<?php

    include('../../conexao/conn.php');

    $ID = $_REQUEST['LOCAL_ID'];

    $sql = "SELECT COUNT(ID) as TOTAL FROM CHILD c";

    if(isset($ID)){
        $sql .= " WHERE LOCAL_ID = ".$ID;
    }

    $resultado = $pdo->query($sql);

    if($resultado){
        $dadosEixo = array();
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dadosEixo = array_map('utf8_encode', $row);
        }
        $dados = array(
            'tipo' => 'success',
            'mensagem' => '',
            'dados' => $dadosEixo
        );
    } else {
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível obter o registro solicitado.',
            'dados' => array()
        );
    }

    echo json_encode($dados);
