export interface IFlowNode {
  id: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
  type?: string;
}

export type PositionType = {
  id: string;
  type: "position";
  dragging: boolean;
  positionAbsolute?: {
    x: number;
    y: number;
  };
  position?: {
    x: number;
    y: number;
  };
};
