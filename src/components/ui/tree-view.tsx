import { TreeItem } from "@/types";

import{
    Sidebar,
    SidebarGroup,
    SidebarProvider,
    SidebarGroupContent,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuItem,
    SidebarMenu,
    SidebarContent,
}from "@/components/ui/sidebar";
import { ChevronRight, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";


interface TreeViewProps{
    data: TreeItem[];
    value?:string|null;
    onSelect?:(value:string|null) => void;
}

export const TreeView = ({
    data,
    value,
    onSelect
}:TreeViewProps) => {
    return(
       <SidebarProvider>
        <Sidebar collapsible="none" className="w-full">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.map((item,index)=>(
                                <Tree
                                key={index}
                                item={item}
                                selectedValue={value}
                                onSelect={onSelect}
                                parentPath=""
                                />
                            ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            </Sidebar>
       </SidebarProvider>
    );
}

interface TreeProps{
    item:TreeItem;
    selectedValue?: string | null;
    onSelect?: (value:string) => void;
    parentPath : string;
}

const Tree = ({ item , selectedValue , onSelect, parentPath}:TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if(!items.length){

        const isSelected = selectedValue === currentPath;

        return (
            <SidebarMenuButton
            isActive={isSelected}
            className="data--[active=true]:bg-transparent"
            onClick={()=> onSelect?.(currentPath)}>

             <FileIcon/>
             <span className="truncate">
                {name}
             </span>
            </SidebarMenuButton>
        )
    }

    return(
        <SidebarMenuItem>
            <Collapsible
            className="group"
            defaultOpen
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRightIcon className = "transition-transform group-data-[state=open]:rotate-90"/>
                        <FolderIcon/>
                        <span className="truncate">
                            {name}
                        </span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenu>
                        {items.map((subItem,index)=>(
                            <Tree
                            key = {index}
                            item={subItem}
                            selectedValue={selectedValue}
                            onSelect={onSelect}
                            parentPath={currentPath}
                            />
                        ))}
                    </SidebarMenu>
                </CollapsibleContent>
            </Collapsible>
            
        </SidebarMenuItem>
    );


}