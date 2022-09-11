<?php

    include('../../conexao/conn.php');

    session_start();

    $dados = array();

    $sql = "SELECT * FROM LOCAL WHERE INSTITUICAO_ID = ".$_SESSION['INSTITUICAO_ID']."";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);