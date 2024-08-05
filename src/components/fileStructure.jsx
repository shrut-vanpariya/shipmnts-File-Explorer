'use client';

import React, { useState } from 'react'
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { Folder } from 'lucide-react';
import { File } from 'lucide-react';

const FileStructure = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div key={folder.name}>
      <span className='flex items-center gap-1.5 py-1'>
        {
          folder.folders && folder.folders.length > 0 && (
            <button onClick={() => setIsOpen(!isOpen)}>
              <ChevronRight size={20} className={`${isOpen ? "rotate-90" : ""}`} />
            </button>
          )
        }
        {folder.folders ?
          <Folder className={`${folder.folders.length === 0 ? 'ml-[22px]':''}`} /> :
          <File className='ml-[22px]'/>
        }
        {folder.name}
      </span>
      {isOpen && (
        <ul className='pl-6'>
          {folder.folders?.map((folder) => (
            <FileStructure folder={folder} key={folder.name} />
          ))}
        </ul>
      )}

    </div>
  )
}

export default FileStructure
