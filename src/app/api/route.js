export async function GET(req, res) {
    return new Response(JSON.stringify("hello"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}