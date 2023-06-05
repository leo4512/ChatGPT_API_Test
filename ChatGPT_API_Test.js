import { Configuration, OpenAIApi } from "openai";
import { config } from 'dotenv';
import axios from 'axios';
import { performance } from 'perf_hooks';
import { OpenAI } from "langchain/llms/openai";
import ora from 'ora';
import readline from 'readline';

// Load environment configuration
config();

// Check if the OpenAI API Key is present in the environment variables
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API key in environment");
}

// Configure the OpenAI API with the API key from the environment variables
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the OpenAI API with the configuration
const openai = new OpenAIApi(configuration);

// Initialize the LangChain API
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
});

// Define the test data
const testData = {
    model: "gpt-3.5-turbo",
    messages: [{ "role": "system", "content": "Hello, how can I assist you today?" }, { "role": "user", "content": "Tell me a joke" }],
    temperature: 0,
    max_tokens: 1000,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null
};

// Define the test results for OpenAI package and Axios
let testResultsOpenAI = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalTime: 0,
};

let testResultsAxios = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalTime: 0,
};

let testResultsLangChain = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalTime: 0,
};

// Function to generate a chat completion using OpenAI's API
const generateChatCompletionOpenAI = async (content) => {
    testResultsOpenAI.totalRequests++;
    let startTime = performance.now();

    try {
        const response = await openai.createChatCompletion(content);

        // Check the status of the response
        if (response.status !== 200) {
            throw new Error(`Error status: ${response.status}`);
        } else {
            testResultsOpenAI.successfulRequests++;
        }
    } catch (e) {
        console.log("Error getting GPT completion with OpenAI package: ", e);
        testResultsOpenAI.failedRequests++;
    }

    let endTime = performance.now();
    let duration = endTime - startTime;
    testResultsOpenAI.totalTime += duration;
}

// Function to generate a chat completion using axios
const generateChatCompletionAxios = async (content) => {
    testResultsAxios.totalRequests++;
    let startTime = performance.now();

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', content, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        // Check the status of the response
        if (response.status !== 200) {
            throw new Error(`Error status: ${response.status}`);
        } else {
            testResultsAxios.successfulRequests++;
        }
    } catch (e) {
        console.log("Error getting GPT completion with Axios: ", e);
        testResultsAxios.failedRequests++;
    }

    let endTime = performance.now();
    let duration = endTime - startTime;
    testResultsAxios.totalTime += duration;
}

const generateChatCompletionLangChain = async () => {
    testResultsLangChain.totalRequests++;
    let startTime = performance.now();

    try {
        const response = await model.call(
            "Tell me a joke"
        );

        // Check the status of the response
        if (response === undefined) {
            throw new Error(`Error status: ${e}`);
        } else {
            testResultsLangChain.successfulRequests++;
        }
    } catch (e) {
        console.log("Error getting GPT completion with LangChain: ", e);
        testResultsLangChain.failedRequests++;
    }

    let endTime = performance.now();
    let duration = endTime - startTime;
    testResultsLangChain.totalTime += duration;
}



// Run the tests
const runTest = async (cycles) => {
    try {
        // Initialize a throbber
        const throbber = ora({
            text: 'Processing...',
            spinner: 'dots', // choose your preferred spinner style
        }).start();

        // Call each method the number of times specified by the user
        for (let i = 0; i < cycles; i++) {
            // Update the throbber's text
            throbber.text = `Processing request ${i + 1} of ${cycles}...`;
            await generateChatCompletionOpenAI(testData);
            await generateChatCompletionAxios(testData);
            await generateChatCompletionLangChain();
        }

        // Stop the throbber when the processing is finished
        throbber.stop();

        // Log the results
        console.log();
        console.log(`Test results for ${cycles} cycles:`)
        console.log();
        console.log("OpenAI package:");
        console.log(`Total requests: ${testResultsOpenAI.totalRequests}`);
        console.log(`Successful requests: ${testResultsOpenAI.successfulRequests}`);
        console.log(`Failed requests: ${testResultsOpenAI.failedRequests}`);
        console.log(`Total time: ${testResultsOpenAI.totalTime}ms`);
        console.log(`Average time per request: ${testResultsOpenAI.totalTime / testResultsOpenAI.totalRequests}ms`);
        console.log();
        console.log("Axios:");
        console.log(`Total requests: ${testResultsAxios.totalRequests}`);
        console.log(`Successful requests: ${testResultsAxios.successfulRequests}`);
        console.log(`Failed requests: ${testResultsAxios.failedRequests}`);
        console.log(`Total time: ${testResultsAxios.totalTime}ms`);
        console.log(`Average time per request: ${testResultsAxios.totalTime / testResultsAxios.totalRequests}ms`);
        console.log();
        console.log("LangChain:");
        console.log(`Total requests: ${testResultsLangChain.totalRequests}`);
        console.log(`Successful requests: ${testResultsLangChain.successfulRequests}`);
        console.log(`Failed requests: ${testResultsLangChain.failedRequests}`);
        console.log(`Total time: ${testResultsLangChain.totalTime}ms`);
        console.log(`Average time per request: ${testResultsLangChain.totalTime / testResultsLangChain.totalRequests}ms`);

    } catch (err) {
        console.error(`Test failed: ${err}`);
    }
};

// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getUserInput = () => {
    return new Promise((resolve, reject) => {
        rl.question('How many API call cycles? (Please enter a number) ', (answer) => {
            let cycles = Number(answer);

            if (isNaN(cycles)) {
                console.error("Invalid input, please enter a number");
                resolve(getUserInput());  // Call the function again if input is not a number
            } else {
                rl.close();
                return resolve(cycles); // Resolve the promise with the number of cycles when we get a valid input
            }
        });
    });
}

const startTest = async () => {
    let cycles = await getUserInput();
    await runTest(cycles);
}

startTest();
