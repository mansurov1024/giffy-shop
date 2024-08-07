export async function login(email: string, password: string): Promise<string | null> {
    const response = await fetch(
        `http://localhost:3002/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                },
            )
        },
    );
    if (response.status === 200) {
        const responseJson = await response.json();
        return responseJson.token;
    } else if (response.status === 401) {
        const responseJson = await response.json();
        alert(responseJson.message);
    }
    return null;
}