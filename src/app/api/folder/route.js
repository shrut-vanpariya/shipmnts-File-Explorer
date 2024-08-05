import { connectMongoDB } from "@/dbConfig/dbConfig";
import File from "@/model/file";


export async function POST(req, res) {
    const data = await req.json();
    console.log(data);

    await connectMongoDB();

    const folderData = await File.find();
    console.log(folderData);

    if (folderData.length == 0) {
        const rootFolder = new File({
            name: 'root',
            type: 'folder',
        });
        await rootFolder.save();
        console.log(rootFolder);
        
    }


    return new Response(JSON.stringify({ message: "new folder created" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}