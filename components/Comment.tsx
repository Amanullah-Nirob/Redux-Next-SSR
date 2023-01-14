import Image from 'next/image';
import React, { FC } from 'react';
import { IComment } from '../types/DBmodels';
import { getDate } from '../utils/time';

interface ICommentProps {
    item: IComment
}

const Comment: FC<ICommentProps> = ({ item }) => {
    return (
        <li className="flex gap-5">
            <div className="h-14 w-14 relative">
                <Image src={item.user.img} alt="userimg" layout="fill" objectFit="cover" className=" rounded-[50%]" />
            </div>

            <div className="flex flex-col flex-grow">
                <span className="text-lg font-bold">{item.user.email}</span>
                <span className="">{item.text}</span>
            </div>

            <span className="text-sm">
                {getDate(item.createdAt)}
            </span>
        </li>
    );
};

export default Comment;