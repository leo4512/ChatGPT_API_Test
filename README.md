# ChatGPT_API_Test

This a command line app testing three major methods of calling ChatGPT through API: OpenAI official package, Axios, and LangChain. 

### Sample output

User can set the desired number of test cycles.

```
---- Test results for 2 cycles ----

OpenAI package:
Total requests: 2
Successful requests: 2
Failed requests: 0
Total time: 4360.204166889191ms
Average time per request: 2180.1020834445953ms

Axios:
Total requests: 2
Successful requests: 2
Failed requests: 0
Total time: 5233.1582090854645ms
Average time per request: 2616.5791045427322ms

LangChain:
Total requests: 2
Successful requests: 2
Failed requests: 0
Total time: 6186.429499864578ms
Average time per request: 3093.214749932289ms

----  End of test ----
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
