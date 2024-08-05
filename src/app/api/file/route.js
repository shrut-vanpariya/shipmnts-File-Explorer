import { connectMongoDB } from "@/dbConfig/dbConfig";
import File from "@/model/file";


export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  try {
    await connectMongoDB();

    const baseFolder = await File.findById(data.folderId);
    console.log(baseFolder);

    const newFile = new File({
      name: data.fileName,
      type: 'file',
      data: {
        value: data.value
      },
    });
    await newFile.save();
    console.log(newFile);
    baseFolder.folders.push(newFile._id);
    await baseFolder.save();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "error creating file" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  return new Response(JSON.stringify({ message: "new file created" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}