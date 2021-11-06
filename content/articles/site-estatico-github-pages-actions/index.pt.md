---
title: Como publicar um site estático no Github Pages usando Actions
date: '2019-01-12T22:12:03.284Z'
description: Isso é tudo que você precisa fazer para ter um blog com deploy automatizado sem custos com o Github.
tags: ['Static Web Sites', 'Github', 'Deploy', 'Gatsby']
---

Uma das minhas metas de 2020 é conseguir manter um blog e tomada essa decisão comecei a projetar como ele seria publicado. Avaliei [static generators](/tags/static-web-sites), WordPress, Medium e outras plataformas _plug-and-play_ mas nenhuma me dava a liberdade para customizar como um bom desenvolvedor gosta, não restou dúvidas, usar um gerador estático como o [Gatsby](https://www.gatsbyjs.org/) era a escolha mais inteligente para um desenvolvedor React.

Passada a fase de estudos, concepção, horas de diversão montando um tema que atendesse minhas necessidades, começou a jornada que imaginava ser um problema ao optar por construir um blog fora de grandes plataformas: Como e onde publicar? Estudei alguns provedores como por exemplo o S3 da Amazon mas enquanto fazia o último _commit_ de meus ajustes no tema a resposta chegou em forma de pergunta: Por que não uso o próprio [github](https://github.com/diegocosta) como servidor de arquivos?

## Configurações Iniciais

Existem diversas formas de configurar a publicação de uma página usando o [github pages](https://pages.github.com/), no meu caso optei por usar a branch master como versão de **produção** do blog e para isso é necessário ir nas configurações de seu repositório, rolar até a sessão **GitHub Pages** e escolher _master branch_ como **Source**. Nessa mesma sessão você consegue adicionar um [domínio customizado](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site) e ativar o HTTPS.

## Publicação

Ao usar um gerador estático você muito provavelmente precisa executar um script de build para gerar a versão final do seu site, no Gatsby esse comando é `gatsby build` e ele cria um diretório `public` em seu projeto. Aqui entra em cena o [Github Actions](https://github.com/features/actions) permitindo você automatizar a publicação de seu site a cada novo _push_ e para iniciar com esse recurso você só precisa criar um arquivo `.yml` dentro do seguinte diretório em seu projeto: `.github/workflows/qualquer-nome.yml` com a seguinte estrutura:

Primeiramente definimos um nome para o workflow, o meu chamei de `Deploy on Github Pages`:

```yml
name: Deploy on Github Pages
```

O próximo passo é definir qual evento será responsável por disparar os processos, como eu estou publicando meus arquivos de desenvolvimento na branch _develop_ eu quero que a trigger seja disparada quando eu realizar um novo push nela.

```yml
name: Deploy on Github Pages

on:
  push:
    branches:
      - develop
```

Agora chega a parte onde a mágica acontece, vamos definir o trabalho a ser executado, para isso eu usei duas [actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-actions) da comunidade para atingir meus objetivos:

O [borales/actions-yarn](https://github.com/Borales/actions-yarn) tem como função executar scripts do package.json usando o yarn, com ela eu instalo as dependências e executo o build da aplicação. Sua configuração é bastante simples, só precisamos informar qual script será executado no atributo `with.cmd`.

Enquanto o [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) é responsável por pegar um diretório e mover para uma branch, para isso precisamos informar o diretório em `env.PUBLISH_DIR`, a branch destino em `env.PUBLISH_BRANCH` e a [chave de deploy](https://developer.github.com/v3/guides/managing-deploy-keys/) em `env.ACTIONS_DEPLOY_KEY`.

O arquivo `.yml` final ficou assim:

```yml
name: Deploy on Github Pages

on:
  push:
    branches:
      - develop

jobs:
  build:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: borales/actions-yarn@v2.0.0
        with:
          cmd: install
      - uses: borales/actions-yarn@v2.0.0
        with:
          cmd: build
      - uses: peaceiris/actions-gh-pages@v2
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: master
          PUBLISH_DIR: ./public
```

## Como configurar chaves de deploy

Se assim como eu, você precisou configurar pela primeira vez chaves de deploy no Github, vem que eu te ajudo.

Primeiro você precisa gerar uma nova chave SSH usando o comando abaixo em seu terminal:

```shell
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
```

Se tudo deu certo, você vai receber o retorno abaixo:

```shell
Generating public/private rsa key pair.
Your identification has been saved in gh-pages.
Your public key has been saved in gh-pages.pub.
The key fingerprint is:
SHA256:TizUu... diego@...
```

O próximo passo é configurar a chave publica, para isso vá nas configurações do seu repositório, clique em **Deploy Keys** e adicione o conteúdo do arquivo `gh-pages.pub` no campo _Key_, em _title_ deve informar o nome da chave que você definiu no `.yml` (em nosso caso é `ACTIONS_DEPLOY_KEY`) e deve marcar _Allow write access_ para conseguirmos fazer um _push_ com essa _key_.

```shell
cat gh-pages.pub  # o cat serve também pra ver o conteúdo de um arquivo.
```

Por fim devemos informar também a chave privada, ainda nas configurações escolha **Secrets** e adicione uma nova com o conteúdo do arquivo `gh-pages`:

```shell
cat gh-pages
```

E isso é tudo que você precisa fazer para ter um blog com deploy automatizado sem custos no Github.

✅ Complete job.
