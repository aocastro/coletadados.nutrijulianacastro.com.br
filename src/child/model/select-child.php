<?php

    include('../../conexao/conn.php');

    $dados = array();

    $sql = "SELECT c.ID, c.NAME, DATE_FORMAT(c.NASCIMENTO, '%d/%m/%Y') as NASCIMENTO
            FROM CHILD c 
            WHERE c.LOCAL_ID = ".$_REQUEST['LOCAL_ID']."";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);