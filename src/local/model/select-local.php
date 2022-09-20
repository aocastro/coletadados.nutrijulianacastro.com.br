<?php

    include('../../conexao/conn.php');

    session_start();

    $dados = array();

    $sql = "SELECT *, (SELECT COUNT(ID) FROM CHILD c WHERE c.LOCAL_ID = l.INSTITUICAO_ID) as TOTAL
            FROM `LOCAL` l
            WHERE l.INSTITUICAO_ID = ".$_SESSION['INSTITUICAO_ID']."";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);