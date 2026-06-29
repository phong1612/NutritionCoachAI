export async function getRecipeFromChef(ingredients) {
    const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients })
    });

    if(!res.ok) {
        const text = await res.text();
        console.error('Status: ', res.status);
        console.error('Response: ', text);
        throw new Error("API req failed");
    }

    return await res.json();
}

