const MAILERLITE_KEY = import.meta.env.MAILERLITE_KEY;

async function subscribe(email: string) {
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${MAILERLITE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    });

    return await response.json();
}

export { subscribe };
