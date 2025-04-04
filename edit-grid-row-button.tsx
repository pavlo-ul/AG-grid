import React, { FC } from 'react';
import Link from 'next/link';
import { Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditGridRowButtonProps {
  href: string;
}

const EditGridRowButton: FC<EditGridRowButtonProps> = ({ href }) => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={href}
      >
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full bg-indigo p-0 hover:bg-indigo/80 dark:hover:bg-indigo/80"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-indigo p-0 hover:bg-indigo/80 dark:hover:bg-indigo/80">
            <Edit3 className="size-4 cursor-pointer text-black" />
          </div>{' '}
        </Button>
      </Link>
    </div>
  );
};

export default EditGridRowButton;