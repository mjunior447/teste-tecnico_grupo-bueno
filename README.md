# Instruções para rodar o projeto localmente


**Nota: neste guia, estou levando em consideração que você já tem um servidor MySQL instalado localmente. Caso não tenha, será necessário fazer a instalação dele antes de prosseguir.**


## Preparando o Backend
1. Navegue até a pasta /backend
2. Na raiz da pasta, rode o comando `npm install` para instalar as dependências do backend
3. Crie um arquivo chamado `.env` na raiz do backend, e cole nele estas linhas de código:
   
    > MYSQL_HOST='127.0.0.1'
    > 
    > MYSQL_USER='root'
    > 
    > MYSQL_PASSWORD='root'
    > 
    > MYSQL_DATABASE='user_db'

4. Agora, abra um terminal MySQL e, depois de inserir as mesmas credenciais de `user` e `password` do arquivo `.env`, copie o conteúdo do arquivo `schema.sql` e rode-o no seu terminal MySQL. Isso irá criar o Database e a tabela `users`, e irá inserir dois usuários nessa tabela.
5. Por fim, rode o comando `npm run dev` na raiz do backend, e seu servidor estará de pé.

**Observação: caso queira testar as rotas do backend isoladamente, é possível fazer isso com o arquivo `test.http`. Para isso, no seu VSCode, instale a extensão `REST Client` para conseguir fazer as chamadas.**

## Preparando o Frontend
1. Abra outro terminal e navegue até a pasta /frontend
2. Na raiz da pasta, rode o comando `npm install` para instalar as dependências do frontend
3. Rode o comando `npm run dev` na raiz do frontend
4. No navegador, acesse a URL indicada no terminal
