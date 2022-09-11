<?php

    session_start();

    if (isset($_FILES['ARQUIVO']['name']) && $_FILES['ARQUIVO']['error'] == 0) {

        $arquivo_tmp = $_FILES['ARQUIVO']['tmp_name'];
        $nome = $_FILES['ARQUIVO']['name'];

        $extensao = pathinfo ($nome, PATHINFO_EXTENSION);

        $extensao = strtolower ($extensao);

        if (strstr('.jpg;.jpeg;.gif;.png', $extensao)) {
            $novoNome = uniqid(time()).'.'.$extensao;

            $destino = '../files/'.$novoNome;

            if (@move_uploaded_file($arquivo_tmp, $destino)) {
                
                include('../../conexao/conn.php');

                $requestData = $_REQUEST;

                if(empty($requestData['NOME'])){
                    $dados = array(
                        "tipo" => 'error',
                        "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
                    );
                } else {
                    $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
                    $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

                    if($operacao == 'insert'){
                        try{
                            $stmt = $pdo->prepare('INSERT INTO INSTITUICAO (NOME, LOGO, STATUS) VALUES (:a, :b, :c)');
                            $stmt->execute(array(
                                ':a' => utf8_decode($_REQUEST['NOME']),
                                ':b' => $novoNome,
                                ':c' => '1'
                            ));
                            
                            $retorno = array(
                                "tipo" => 'success',
                                "mensagem" => 'Registro cadastrado com sucesso.'
                            );
                        } catch(PDOException $e) {
                            $retorno = array(
                                "tipo" => 'error',
                                "mensagem" => 'Não foi possível efetuar o cadastro do registro.'.$e
                            );
                        }
                    } else {
                        // Se minha variável operação estiver vazia então devo gerar os scripts de update
                        try{
                            $stmt = $pdo->prepare('UPDATE INSTITUICAO SET NOME = :a, LOGO = :b WHERE ID = :id');
                            $stmt->execute(array(
                                ':id' => $ID,
                                ':a' => utf8_decode($_REQUEST['NOME']),
                                ':b' => $novoNome
                            ));

                            $retorno = array(
                                "tipo" => 'success',
                                "mensagem" => 'Registro atualizado com sucesso.'
                            );
                        } catch (PDOException $e) {
                            $retorno = array(
                                "tipo" => 'error',
                                "mensagem" => 'Não foi possível efetuar o alteração do registro.'.$e
                            );
                        }
                    }
                }

                // $retorno = array ('mensagem' => 'Arquivo salvo com sucesso em : ' . $destino);
            }
            else
                $retorno = array ('mensagem' => 'Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita.');
        }
        else
            $retorno = array ('mensagem' => 'Você poderá enviar apenas arquivos "*.PDF"');
    }
    else
        $retorno = array ('mensagem' => 'Você não enviou nenhum arquivo!');


    echo json_encode($retorno);