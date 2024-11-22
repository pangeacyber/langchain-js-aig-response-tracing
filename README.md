# AI Guard Response Tracing for LangChain in JavaScript

An example JavaScript app demonstrating how to integrate Pangea's [AI Guard][]
service into a LangChain app to monitor and sanitize LLM generations.

## Prerequisites

- Node.js v22.
- A [Pangea account][Pangea signup] with AI Guard enabled.
- An [OpenAI API key][OpenAI API keys].

## Setup

```shell
git clone https://github.com/pangeacyber/langchain-js-aig-response-tracing.git
cd langchain-js-aig-response-tracing
npm install
cp .env.example .env
```

Fill in the values in `.env` and then the app can be run like so:

```shell
npm run demo -- "A prompt would go here."
```

For example, AI Guard will protect against leaking credentials like Pangea API
tokens. The easiest way to demonstrate this would be to have the LLM repeat a
given (fake) API token:

```shell
npm run demo -- "Echo 'pts_testtesttesttesttesttesttesttest' back."
```

The output after AI Guard is:

```
************************************
```

[AI Guard]: https://pangea.cloud/docs/ai-guard/
[Pangea signup]: https://pangea.cloud/signup
[OpenAI API keys]: https://platform.openai.com/api-keys
