<?php

    include('../../conexao/conn.php');

    $requestData = $_REQUEST;

    $colunas = $requestData['columns'];

    $sql = "SELECT ID, NAME FROM CHILD WHERE STATUS = 1 AND 1=1 ";

    $resultado = $pdo->query($sql);
    $qtdeLinhas = $resultado->rowCount();
    
    $filtro = $requestData['search']['value'];
    if( !empty( $filtro ) ){
        $sql .= " AND (ID LIKE '$filtro%' ";
        $sql .= " OR NAME LIKE '$filtro%') ";
    }
    
    $resultado = $pdo->query($sql);
    $totalFiltrados = $resultado->rowCount();
    
    $colunaOrdem = $requestData['order'][0]['column']; //Obtém a posição da coluna na ordenação
    $ordem = $colunas[$colunaOrdem]['data']; //Obtém o nome da coluna para a ordenação
    $direcao = $requestData['order'][0]['dir']; //Obtém a direção da ordenação
    
    $inicio = $requestData['start']; //Obtém o ínicio do limite
    $tamanho = $requestData['length']; //Obtém o tamanho do limite
    
    $sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
    $resultado = $pdo->query($sql);
    $dados = array();
    while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
        $dados[] = array_map('utf8_encode', $row);
    }

    $json_data = array(
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($qtdeLinhas),
        "recordsFiltered" => intval($totalFiltrados),
        "data" => $dados
    );

    echo json_encode($json_data);