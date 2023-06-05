# ChatGPT_API_Test

This testing script tests three major methods of calling ChatGPT through API: OpenAI official package, Axios, and LangChain.

### Sample output

```
Test results for 5 cycles:

OpenAI package:
Total requests: 5
Successful requests: 5
Failed requests: 0
Total time: 10288.902832984924ms
Average time per request: 2057.780566596985ms

Axios:
Total requests: 5
Successful requests: 5
Failed requests: 0
Total time: 78026.62633514404ms
Average time per request: 15605.32526702881ms

LangChain:
Total requests: 5
Successful requests: 5
Failed requests: 0
Total time: 20737.353375196457ms
Average time per request: 4147.470675039292ms
```

## Get Started

### Install packages

```
npm i
```

### Add .env at the root

Content of .env file:

```
OPENAI_API_KEY=<your openai api key>
```

## Run project

```
npm start
```
