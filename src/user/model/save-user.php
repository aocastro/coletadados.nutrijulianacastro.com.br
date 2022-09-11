<?php

    include('../../conexao/conn.php');

    $requestData = $_REQUEST;

    if(empty($requestData['LOGIN']) || empty($requestData['PASS'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else {
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        if($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare('INSERT INTO USER (NAME, LOGIN, PASS, INSTITUICAO_ID, STATUS) VALUES (:a, :b, :c, :d, :e)');
                $stmt->execute(array(
                    ':a' => utf8_decode($requestData['NAME']),
                    ':b' => utf8_decode($requestData['LOGIN']),
                    ':c' => md5($requestData['PASS']),
                    ':d' => $requestData['INSTITUICAO_ID'],
                    ':e' => '1'
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível efetuar o cadastro.'
                );
            }
        } else {
            try{
                $stmt = $pdo->prepare('UPDATE USER SET NAME = :a, LOGIN = :b, PASS = :c, INSTITUICAO_ID = :d WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => utf8_decode($requestData['NAME']),
                    ':b' => utf8_decode($requestData['LOGIN']),
                    ':c' => md5($requestData['PASS']),
                    ':d' => $requestData['INSTITUICAO_ID']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro atualizado com sucesso.'
                );
            } catch (PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível efetuar o alteração do registro.'
                );
            }
        }
    }

    echo json_encode($dados);