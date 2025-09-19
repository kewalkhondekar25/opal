import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function MyWorkspace() {
    return (
        <div className="mt-3">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Workspaces" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <SelectItem value="My Workspace">My Workspace</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
