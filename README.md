# ChatGPT_API_Test

This testing script tests three major methods of calling ChatGPT through API: OpenAI official package, Axios, and LangChain.

### Sample output

```
Results for OpenAI package:
Total requests: 100
Successful requests: 100
Failed requests: 0
Total time: 185694.60354423523ms
Average time per request: 1856.9460354423522ms
Results for Axios:
Total requests: 100
Successful requests: 99
Failed requests: 1
Total time: 208740.52425003052ms
Average time per request: 2087.405242500305ms
Results for LangChain:
Total requests: 100
Successful requests: 100
Failed requests: 0
Total time: 205995.5920062065ms
Average time per request: 2059.955920062065ms
```

## Get Started

### Install packages

```
npm i
```

### Add .env at the root

```
OPENAI_API_KEY=<your openai api key>
```

## Run project

```
npm start
```