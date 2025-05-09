import { createClient } from '@hey-api/openapi-ts';

try {
    await createClient({
        input: "http://localhost:7070/api/api-docs",
        output: "./src/client",
        plugins: ["@hey-api/client-fetch"],
    })
} catch (error) {
    console.error("Error generating API client:", error);
}