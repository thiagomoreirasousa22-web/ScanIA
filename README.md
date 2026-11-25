# ScanIA

Aplicativo Android para fotografar notas fiscais ou selecionar imagens da galeria, extrair dados com IA, revisar o resultado e acompanhar os gastos por mês. Projeto baseado no guia de Programação para Dispositivos Móveis do IESB.

## Executar no VS Code

Use Node.js 22.13+ (linha 22), 24.3+ (linha 24) ou 26+. Abra a pasta que contém `package.json`.

```powershell
npm.cmd ci
Copy-Item .env.example .env
```

Execute a cópia do modelo só se ainda não tiver um `.env`. Preencha `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_KEY` com a **Project URL** e a chave pública **publishable** ou **anon** do seu projeto. O app abre na tela de login quando essas variáveis estão configuradas.

## Preparar o Supabase

1. Crie um projeto Supabase para o ScanIA e execute todo o [schema.sql](supabase/schema.sql) uma vez no **SQL Editor**. Ele cria as tabelas, as políticas que isolam os dados por usuário e o bucket privado de fotos.
2. Confira se o provedor **Email** está habilitado em **Authentication → Sign In / Providers**. Com a confirmação de e-mail ativa, confirme o cadastro antes de entrar.
3. Autentique a CLI e publique a função em modo simulado. Substitua `SEU_PROJECT_REF` pelo identificador do seu projeto Supabase.

```powershell
npx.cmd supabase login
npx.cmd supabase secrets set MOCK_AI=true --project-ref SEU_PROJECT_REF
npx.cmd supabase functions deploy scan-receipt --project-ref SEU_PROJECT_REF
```

`MOCK_AI=true` usa dados fixos de exemplo para testar o fluxo completo sem chamadas à OpenAI. A foto continua privada no Supabase. Para extração real, crie uma chave na [plataforma da OpenAI](https://platform.openai.com/api-keys), configure `OPENAI_API_KEY` em **Edge Functions → Secrets** e altere `MOCK_AI` para `false` se estiver ativado. A função envia a foto à API da OpenAI, que pode cobrar por uso. O modelo padrão é `gpt-4.1-mini`. Se precisar trocar o modelo, configure `OPENAI_MODEL` com um modelo que aceite imagens e saídas estruturadas. Use uma nota sem dados pessoais na demonstração.

## Testar no Android

```powershell
npm.cmd start -- --clear
```

Abra o QR code no Expo Go compatível com o SDK 58. Mantenha o terminal aberto. Cadastre uma conta, selecione uma nota em **Escanear**, revise o resultado, salve uma correção e confira o **Resumo**. Faça o mesmo com uma segunda conta para verificar o isolamento das notas. Reinicie o Expo após mudar o `.env`.

```powershell
npm.cmd run typecheck
npm.cmd test -- --runInBand
```

## Gerar APK

O perfil `preview` em [eas.json](eas.json) gera APK. Vincule o projeto no EAS e configure as duas variáveis públicas do Supabase no ambiente `preview` antes de rodar `npx.cmd eas-cli build --platform android --profile preview`. A chave da OpenAI fica no Supabase. Antes de publicar no GitHub, confirme que o `.env` está fora do commit.
