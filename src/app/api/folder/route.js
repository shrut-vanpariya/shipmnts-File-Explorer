import { connectMongoDB } from "@/dbConfig/dbConfig";
import File from "@/model/file";

async function populateNestedFolders(fileId) {    
    const file = await File.findById(fileId).populate('folders');
    
    if (!file) {
        return null;
    }

    // Recursively populate child folders
    for (const folderId of file.folders) {
        await populateNestedFolders(folderId);
    }

    return file;
}

export async function GET(req, res) {
    const { searchParams } = new URL(req.url)
    const folderId = searchParams.get('folderId');


    console.log(folderId);
    let populatedFile;
    if (!folderId) {
        try {
            await connectMongoDB();

            const folderData = await File.find({ name: "root" });
            console.log(folderData);

            populatedFile =  await populateNestedFolders(folderData[0]._id)
            




        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({ error: "error creating folder" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
    return new Response(JSON.stringify({ message: "success getfolder", data:populatedFile}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(req, res) {
    const data = await req.json();
    console.log(data);

    try {
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
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "error creating folder" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    return new Response(JSON.stringify({ message: "new folder created" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}