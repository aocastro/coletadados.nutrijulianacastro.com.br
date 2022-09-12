<?php

    include('../../conexao/conn.php');

    session_start();

    $requestData = $_REQUEST;

    // DEFINE O FUSO HORARIO COMO O HORARIO DE BRASILIA
    date_default_timezone_set('America/Sao_Paulo');
    // CRIA UMA VARIAVEL E ARMAZENA A HORA ATUAL DO FUSO-HORÀRIO DEFINIDO (BRASÍLIA)
    $dataLocal = date('Y-m-d');

    if(empty($requestData['HEIGHT']) && empty($requestData['WEIGHT'])){
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s), verificar o peso e altura.'
        );
    } else {
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        if($operacao == 'insert'){
            try{
                $stmt = $pdo->prepare('INSERT INTO CENSUS (DATE, HEIGHT, WEIGHT, CHILD_ID, USER_ID) VALUES (:a, :b, :c, :d, :e)');
                $stmt->execute(array(
                    ':a' => $dataLocal,
                    ':b' => $requestData['HEIGHT'],
                    ':c' => $requestData['WEIGHT'],
                    ':d' => $requestData['CHILD_ID'],
                    ':e' => $_SESSION['ID']
                ));

                if($requestData['PREMATURO'] == 'true'){
                    try{
                        $stmt = $pdo->prepare('UPDATE CHILD SET PREMATURO = :a, IDADE_GEST = :b WHERE ID = :id');
                        $stmt->execute(array(
                            ':id' => $requestData['CHILD_ID'],
                            ':a' => $requestData['PREMATURO'],
                            ':b' => $requestData['IDADE_GEST']
                        ));
                    } catch (PDOException $e) {
                        $dados = array(
                            "tipo" => 'error',
                            "mensagem" => 'Não foi possível efetuar o alteração do registro.'
                        );
                    }
                }

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
                $stmt = $pdo->prepare('UPDATE CENSUS SET DATE = :a, HEIGHT = :b, WEIGHT = :c, CHILD_ID = :d, USER_ID = :e  WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => $dataLocal,
                    ':b' => $requestData['HEIGHT'],
                    ':c' => $requestData['WEIGHT'],
                    ':d' => $requestData['CHILD_ID'],
                    ':e' => $_SESSION['ID']
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