import { connectMongoDB } from "@/dbConfig/dbConfig";
import File from "@/model/file";


export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  await connectMongoDB();

  const baseFolder = await File.findById(data.folderId);
  console.log(baseFolder);

  const movieFile = new File({
    name: data.fileName,
    type: 'file',
    data: {
      value: data.value
    },
  });




  return new Response(JSON.stringify({ message: "new file created" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}