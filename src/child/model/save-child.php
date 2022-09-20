<?php

    include('../../conexao/conn.php');

    $requestData = $_REQUEST;

    if(empty($requestData['NAME'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else {
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        if($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare('INSERT INTO CHILD (NAME, MOTHER, NASCIMENTO, SEXO, STATUS, LOCAL_ID) VALUES (:a, :b, :c, :d, :e, :f)');
                $stmt->execute(array(
                    ':a' => utf8_decode($requestData['NAME']),
                    ':b' => utf8_decode($requestData['MOTHER']),
                    ':c' => $requestData['NASCIMENTO'],
                    ':d' => $requestData['SEXO'],
                    ':e' => '1',
                    ':f' => $requestData['LOCAL_ID']
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
                $stmt = $pdo->prepare('UPDATE CHILD SET NAME = :a, MOTHER = :b, NASCIMENTO = :c, SEXO = :d, LOCAL_ID = :e  WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => utf8_decode($requestData['NAME']),
                    ':b' => utf8_decode($requestData['MOTHER']),
                    ':c' => $requestData['NASCIMENTO'],
                    ':d' => $requestData['SEXO'],
                    ':e' => $requestData['LOCAL_ID']
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