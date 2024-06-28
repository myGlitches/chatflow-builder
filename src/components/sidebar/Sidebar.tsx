import ButtonNode from "@/ui-components/Button/ButtonNode";
import { Button } from "@/ui-components/shadcomponents/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui-components/shadcomponents/components/ui/card";
import { Bell, MessageCircleDashedIcon, Package2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block w-2/6">
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
          {true ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Selected Label</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <Input
                    type="text"
                    value={nodeLabel}
                    onChange={handleLabelChange}
                    placeholder="Change node label"
                    className="w-full"
                  /> */}
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 w-ful gap-2 p-2">
                <ButtonNode
                  onClick={() => console.log("addNode")}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
