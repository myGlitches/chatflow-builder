import {
  Bell,
  CircleUser,
  MessageCircle,
  MessageCircleDashedIcon,
  Package2,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/ui-components/shadcomponents/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeMouseHandler,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useRef, useState } from "react";
import { IFlowNode } from "@/utils/common.types";
import ButtonNode from "../ui-components/Button/ButtonNode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui-components/shadcomponents/components/ui/card";
import { Input } from "@/ui-components/shadcomponents/components/ui/input";
import Draggable from "react-draggable";

function MainLayout() {
  let initialNodes: IFlowNode[] = [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ];

  const initialEdges: any[] | (() => any[]) = []; //TODO: fix type

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node>({
    id: "",
    data: {
      label: "",
    },
    position: {
      x: 0,
      y: 0,
    },
  });
  const [openSettings, setOpenSettings] = useState<Boolean>(false);
  const [nodeLabel, setNodeLabel] = useState<string>("");
  const [draggablePosition, setDraggablePosition] = useState({ x: 0, y: 0 });
  const reactFlowWrapper = useRef(null);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (position: { x: number; y: number }) => {
    const newNode: IFlowNode = {
      id: (nodes.length + 1).toString(), // Generate a new unique ID
      data: { label: `New Node ${nodes?.length + 1}` },
      position: position, // Use the provided position
    };
    setNodes([...nodes, newNode]);
  };

  const onNodeClick: NodeMouseHandler = useCallback((event, node: Node) => {
    event.stopPropagation();
    setSelectedNode({
      id: node?.id,
      data: node?.data,
      position: {
        x: node?.position?.x,
        y: node?.position.y,
      },
    });
    setNodeLabel(node.data.label);
    setOpenSettings(true);
    console.log("Node clicked:", node.id);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Delete" && selectedNode) {
        console.log("Delete key pressed for node:", selectedNode);
        setNodes((nds) => nds.filter((node) => node.id !== selectedNode?.id));
        setSelectedNode({
          data: null,
          id: "",
          position: {
            x: 0,
            y: 0,
          },
        }); // Clear the selected node after deletion
      }
    },
    [selectedNode]
  );

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node: Node) => {
      event.preventDefault(); // Prevent the default context menu from appearing
      event.stopPropagation(); // Prevent the parent div's onClick from firing
      setSelectedNode({
        id: node?.id,
        data: node?.data,
        position: {
          x: node?.position?.x,
          y: node?.position.y,
        },
      });
      setNodeLabel(node.data.label);
      setOpenSettings(true); // Example action: open settings for the node
      console.log("Node right-clicked:", node.id);
    },
    []
  );

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value;
    setNodeLabel(newLabel);
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
      setSelectedNode((prevSelectedNode) => ({
        ...prevSelectedNode,
        data: { ...prevSelectedNode.data, label: newLabel },
      }));
    }
  };

  const onNodeDragStop = useCallback((event: any, node: Node) => {
    setSelectedNode({
      id: node?.id,
      data: node?.data,
      position: {
        x: node?.position?.x,
        y: node?.position.y,
      },
    });
    setNodeLabel(node.data.label);
  }, []);

  // Drag Stoppper

  const handleDragStop = (e: any, data: any) => {
    if (reactFlowWrapper.current) {
      const position = {
        x: 0,
        y: 0,
      };
      console.log("Position on ReactFlow sheet:", position);

      // Optionally, you can use this position to add a node at the dropped position
      addNode(position);
      setDraggablePosition({ x: 0, y: 0 });
    } else {
      console.warn("ReactFlow wrapper is not available.");
    }
  };

  return (
    <div className="min-h-screen w-full flex ">
      {/* Main Flow */}
      <div className="flex flex-col w-4/6">
        {/* Navbar */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Nodes"
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="bg-white rounded border"
              align="end"
            >
              <Link to="/login">
                <DropdownMenuLabel className="cursor-pointer hover:bg-slate-200 px-2 py-1 rounded">
                  My Account
                </DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 px-2 py-1 rounded">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 px-2 py-1 rounded">
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 px-2 py-1 rounded">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Flow */}
        <main className="flex flex-1">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div
              ref={reactFlowWrapper}
              className="h-full w-full"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneClick={() => setOpenSettings(false)}
                onNodeClick={onNodeClick}
                onNodeContextMenu={onNodeContextMenu}
                onNodeDragStop={onNodeDragStop}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block w-2/6">
        <div className="flex h-full max-h-screen flex-col ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Chatflow Corp.</span>
            </Link>
          </div>
          {openSettings ? (
            <>
              <Card>
                <CardDescription className="border-b p-2 ">
                  Text
                </CardDescription>
                <CardContent>
                  <Input
                    type="text"
                    value={nodeLabel}
                    onChange={handleLabelChange}
                    placeholder="Change node label"
                    className="w-full mt-3"
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 w-full gap-2 p-2">
                <Draggable
                  axis="both"
                  handle=".handle"
                  position={draggablePosition}
                  defaultPosition={{ x: 0, y: 0 }}
                  grid={[1, 1]}
                  scale={1}
                  onStop={handleDragStop}
                >
                  <div className="handle">
                    <ButtonNode
                      icon={
                        <MessageCircleDashedIcon
                          className="h-6 w-6"
                          color="blue"
                        />
                      }
                      className="w-full h-full border rounded p-3 cursor-grab active:cursor-grabbing flex flex-col hover:bg-blue-200"
                    >
                      Message
                    </ButtonNode>
                  </div>
                </Draggable>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
