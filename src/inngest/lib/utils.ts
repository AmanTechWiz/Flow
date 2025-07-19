import { TreeItem } from "@/../src/types"

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function convertFilesToTreeItems(
  files: {[path:string] : string},
):TreeItem[]{
  interface TreeNode{
    [key:string]:TreeNode | null;
  }

  const tree : TreeNode = {};

  const sortPath = Object.keys(files).sort();

  for(const filePath of sortPath){
    const parts = filePath.split("/");
    let current = tree;
    
    for(let i=0 ; i<parts.length-1; i++){
      const part = parts[i];

      if(!current[part]){
        current[part] = {};
      }
      current = current[part];
    }

    const fileName = parts[parts.length-1];
    current[fileName] = null;
  }

  function convertNode(node : TreeNode, name?: string):TreeItem[] | TreeItem{
      const entries = Object.entries(node);

      if(entries.length === 0){
        return name || "";
      }

      const children: TreeItem[] = [];

      for(const [key, value] of entries){
        if(value === null){
          children.push(key);
        }else{
          const subTree = convertNode(value,key);
          if(Array.isArray(subTree)){
            children.push([key, ...subTree]);
          }else{
            children.push([key, subTree]);
          }
        }
  }
  return children;

}

  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result]
};