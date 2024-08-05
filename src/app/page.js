'use client'
import FileStructure from "@/components/fileStructure";
import { useEffect, useState } from "react";

import { FolderPlus, FilePlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/globalStore";


const fileData = [
  {
    name: "home",
    folders: [
      {
        name: "movies",
        folders: [
          {
            name: "2024",
            folders: [
              {
                name: "movie1.mp4"
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

  const [folderData, setFolderData] = useState([]);

  const {currentFolder, setCurrentFolder} = useStore();

  useEffect(() => {
    try {
      fetch(`/api/folder`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setFolderData([data.data]);
          setCurrentFolder(data.data);
        })
        .catch(error => {
          console.error('Error fetching friend data:', error);
        });
    } catch (error) {
      console.error('Error fetching friend data:', error.message);
    }

  }, [])

  useEffect(() => {
    console.log("here",currentFolder);
    
  }, [currentFolder])

  return (
    <main className="flex min-h-screen items-start justify-start">
      <div className="border-[1px] h-screen min-w-96 p-3">
        <div className="flex justify-between items-center">
          <span>File Explorer</span>
          <div className="flex items-center justify-center gap-x-2">
            <FolderPlus />
            <FilePlus />
          </div>
        </div>
        <Separator className="my-4" />

        {
          folderData?.map((folder) => (
            <FileStructure folder={folder} key={folder.name} />
          ))
        }
      </div>
      <div className=" flex justify-center items-center min-h-screen  w-full border-[1px]">
        {currentFolder ? JSON.stringify(currentFolder) : "No Data"}
      </div>
    </main>
  );
}
