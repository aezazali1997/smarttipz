/* eslint-disable @next/next/no-img-element */
import React from 'react';
import moment from 'moment';
import { Spinner } from '..';
import { CommentActionDropdown } from '../Dropdown';

const CommentCard = ({ data, _HandleGotoUserProfile, loading, _HandleDeleteComments }) => {
	return (
		<>
	
			{loading ? (
				<div className="flex justify-center items-center w-full">
					<Spinner />
				</div>
			) : (
				data.map(
					(
						{
							User: { id, picture, accountType, name, showUsername, showName, username, createdAt },
							message, id: commentId
						},
						index
					) => (
						<div key={index} className="flex space-x-2  border rounded-lg px-3 py-1 relative">
							<img
								src={picture || 'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png'}
								className="rounded-full w-10 h-10 object-cover"
								alt="avatar"></img>
							<div className="flex flex-col">
								<p
									onClick={() => _HandleGotoUserProfile(id, username)}
									className="text-sm font-bold font-sans hover:underline cursor-pointer">
									{accountType === 'Personal'
										? showName
											? name
											: showUsername
												? username
												: ''
										: name}
								</p>
								<p className="text-xs text-gray-500">{moment(createdAt).format('h:mm a')}</p>
								<p className="text-xs pt-2 md:text-sm break-words">{message}</p>
							</div>
							{
								localStorage.getItem('id') == id && (
									<div className="absolute top-2 right-2">
										<CommentActionDropdown
											_HandleDeleteComments={() => _HandleDeleteComments(index, commentId)} />
									</div>
								)}
						</div>
					)
				)
			)}
		</>
	);
};

export default CommentCard;
