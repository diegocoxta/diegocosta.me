---
title: Enviando sua aplicação para o Heroku no Windows
date: "2015-11-26T22:12:03.284Z"
description: Quem nunca precisou colocar aquela aplicação em produção para testar ou até mesmo compartilhar com colegas e 
ficou impedido por não ter um servidor bom para uso gratuito?
tags: ['heroku', 'windows', 'deploy']
---

Quem nunca precisou colocar aquela aplicação em produção para testar ou até mesmo compartilhar com colegas e ficou impedido por não ter um servidor bom para uso gratuito?

Bom, seus problemas acabaram…

[img 01]

O [Heroku](http://heroku.com/) é um serviço de Cloud da Salesforce.com que permite subir aplicações, pagando apenas pelo que usar, e o melhor é que o plano inicial é gratuito e te dá acesso a banco de dados. Nele é possível rodar sua aplicação em Ruby, PHP, Node.js, Python, Java, Scala ou Clojure e o processo de deploy é muito simples e sem burocracia.

### Heroku Toolbelt

Para colocar seu projeto no Heroku você precisa do **[Toolbelt](https://toolbelt.heroku.com/)**, uma ferramenta multi-plataforma que te permite realizar deploys de sua aplicação de maneira simples através do terminal de seu computador.

Para começar é bastante simples, primeiro você precisa acessar o **[site da ferramenta](https://toolbelt.heroku.com/)**, realizar o download da versão disponível para seu sistema operacional e seguir o processo de instalação: Next, Next, Install.

Atenção, caso você não utilize GIT e SSH é obrigatório escolher a opção Custom Installation e marcar o box para Git and SSH.

[img 02]  

Após realizada a instalação, precisamos autenticar o cliente, abra seu terminal e escreva o seguinte comando:

```sh
heroku login
```

Ao digitar isso vai ser solicitado que você entre com suas [credenciais (e-mail e senha)](https://signup.heroku.com/login), coloque seus os dados e se aparecer a mensagem _“Authentication successful.”_ estamos no caminho certo.

Se você já é um usuário GIT pule pro próximo comando, mas se você acabou de instalar o GIT, através da opção _Git and SSH_ do Tooltbelt, temos que criar sua chave SSH para identificar seu computador, digite o comando abaixo:

```sh
ssh-keygen -t rsa
```

A confirmação que tudo ocorreu perfeitamente é um retorno parecido com a mensagem abaixo, caso não esteja recebendo vá até o final do artigo para conferir uma possível solução.

```sh
Your identification has been saved in /Users/Diego/.ssh/id_rsa.
Your public key has been saved in /Users/Diego/.ssh/id_rsa.pub.
The key fingerprint is:
a6:88:0a:0b:...
```

