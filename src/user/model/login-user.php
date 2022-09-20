<?php

    include('../../conexao/conn.php');

    $sql = $pdo->query("SELECT *, count(ID) as achou FROM USER WHERE LOGIN = '".$_REQUEST['LOGIN']."' AND PASS = '".md5($_REQUEST['PASS'])."'");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        if($resultado['achou'] == 1){
            session_start();
            $_SESSION['ID'] = $resultado['ID'];
            $_SESSION['LOGIN'] = $resultado['LOGIN'];
            $_SESSION['NAME'] = $resultado['NAME'];
            $_SESSION['INSTITUICAO_ID'] = $resultado['INSTITUICAO_ID'];
            $_SESSION['TYPE'] = $resultado['TYPE'];
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'Login correto!'
            );
        }else{
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Nome de usuário ou senha errado.'
            );
        }
    }

    echo json_encode($dados);