import FileStructure from "@/components/fileStructure";


const fileData = [
  {
    name: "home",
    folders: [
      {
        name: "movies",
        folders: [
          {
            name:"2024",
            folders:[
              {
                name:"movie1.mp4"
              }
            ]
          }
        ]
      },
      {
        name: "music",
        folders: []
      }
    ]
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start">
      <div className="border-[1px] h-screen p-3">
        {
          fileData.map((folder) => (
            <FileStructure folder={folder} key={folder.name} />
          ))
        }
      </div>
      <div>

      </div>
    </main>
  );
}
