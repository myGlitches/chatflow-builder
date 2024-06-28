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
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useState } from "react";
import { IFlowNode, PositionType } from "@/utils/common.types";
import ButtonNode from "../ui-components/Button/ButtonNode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui-components/shadcomponents/components/ui/card";
import { Input } from "@/ui-components/shadcomponents/components/ui/input";

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

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const newNode: IFlowNode = {
      id: (nodes.length + 1).toString(), // Generate a new unique ID
      data: { label: `New Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for example
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="min-h-screen w-full flex ">
      {/* Main Flow */}
      <div className="flex flex-col w-5/6">
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
            <div className="h-full w-full">
              <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
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
      <div className="hidden border-r bg-muted/40 md:block w-1/6">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Chatflow Corp.</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 w-ful gap-2 p-2">
            <ButtonNode
              onClick={addNode}
              icon={
                <MessageCircleDashedIcon className="h-6 w-6" color="blue" />
              }
              className=" w-full h-full border rounded p-3 cursor-grab active:cursor-grabbing flex flex-col hover:bg-blue-200"
            >
              Message
            </ButtonNode>
          </div>
          <div className="mt-auto p-4">
            {/* <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
