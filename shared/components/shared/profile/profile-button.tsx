import React, { FC } from 'react';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/shared/components/ui";

interface Props {
  onClickOpenModal?: VoidFunction;
  className?: string;
}

export const ProfileButton: FC<Props> = ({ className, onClickOpenModal }) => {
  // const { data: session } = useSession();

  return (
    <div className={className}>
      {/*{session ? (*/}
        <Link href="/profile">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
          >
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      {/*) : (*/}
        <Button
          onClick={onClickOpenModal}
          variant="outline"
        >
          Logout
        </Button>
      {/*)}*/}
    </div>
  );
};
