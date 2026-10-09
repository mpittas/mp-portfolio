import "./mocks.css";
import type { MockId } from "@/lib/types";
import { ClearingCover, ClearingFlow } from "@/components/mocks/clearing";
import {
  RadarCover,
  RadarDashboard,
  RadarStates,
  RadarSystem,
} from "@/components/mocks/radar";

const REGISTRY: Record<MockId, () => React.JSX.Element> = {
  "clearing-flow": ClearingFlow,
  "clearing-cover": ClearingCover,
  "radar-dashboard": RadarDashboard,
  "radar-states": RadarStates,
  "radar-system": RadarSystem,
  "radar-cover": RadarCover,
};

/** Renders a concept screen that is built in code instead of exported from a design tool. */
export function Mock({ id }: { id: MockId }) {
  const Component = REGISTRY[id];
  return <Component />;
}
