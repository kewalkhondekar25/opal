"use client";

import React from 'react';
import { Button } from '../ui/button';
import { LogOut, Upload, Video } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import useRedux from '@/hooks/use-redux';
import useToast from '@/hooks/use-toast';

interface IHeaderButton {
	icon: React.ReactNode,
	label: string,
	className?: string,
	toolTip?: string,
	onClick?: () => void,
	disabled: boolean
};

const HeaderButton = ({ icon, label, className, toolTip, onClick, disabled }: IHeaderButton) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						className={`rounded-full  ${label === "Upload" ? "cursor-not-allowed" : "cursor-pointer"} ${label === "Logout" ? "" : "md:rounded-md"} ${className || ""}`}
						onClick={onClick}
						disabled={disabled}
					>
						{icon}
						<span className={`hidden ${label === "Logout" ? "" : "md:block"}`}>
							{label}
						</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" className='font-semibold'>
					{toolTip}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const Header = () => {

	const router = useRouter();
	const clerk = useClerk();
	const { dispatch, upload, record } = useRedux();
	const path = usePathname();

	const handleLogout = async () => {
		await clerk.signOut();
		router.push("/auth/sign-in");
	};

	const handleUploadClick = () => {
		useToast("Please upgrade to PRO plan")
		dispatch(upload());
	};

	const handleRecordClick = () => {
		if(!path.startsWith("/library")){
			router.push("/library")
		}
		dispatch(record());
	};

	return (
		<div className="flex gap-1 p-2">
			<HeaderButton
				icon={<Upload />}
				label="Upload"
				toolTip='Upload a Video' 
				onClick={handleUploadClick}
				disabled={false}
			/>
			<HeaderButton 
				icon={<Video />} 
				label="Record" 
				toolTip='Record a Video'
				onClick={handleRecordClick}
				disabled={false} 
			/>
			<HeaderButton 
				icon={<LogOut />} 
				label="Logout" 
				toolTip='Logout' 
				onClick={handleLogout}
				disabled={false} 
			/>
		</div>
	);
};

export default Header;
