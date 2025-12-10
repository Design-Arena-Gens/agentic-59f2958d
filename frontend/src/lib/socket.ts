import { websocketUrl } from "./api";
import type { ForecastPoint, GridAlert } from "../types";

type MessagePayload =
  | { type: "forecast"; payload: ForecastPoint }
  | { type: "alert"; payload: GridAlert };

export function createForecastSocket(onMessage: (payload: MessagePayload) => void) {
  const socket = new WebSocket(websocketUrl);

  socket.addEventListener("open", () => {
    console.info("[ws] connected to forecast stream");
  });

  socket.addEventListener("message", (event) => {
    try {
      const parsed = JSON.parse(event.data) as MessagePayload;
      onMessage(parsed);
    } catch (error) {
      console.error("[ws] failed to parse message", error);
    }
  });

  socket.addEventListener("close", () => {
    console.warn("[ws] forecast stream disconnected");
  });

  return socket;
}
