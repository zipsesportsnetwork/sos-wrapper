import Emittery from "emittery";
import WebSocket from "isomorphic-ws";

import { EventDataMap } from "./types";

export const events: (keyof EventDataMap)[] = [
	"game:update_state",
	"game:match_created",
	"game:initialized",
	"game:pre_countdown_begin",
	"game:post_countdown_begin",
	"game:statfeed_event",
	"game:goal_scored",
	"game:replay_start",
	"game:replay_will_end",
	"game:replay_end",
	"game:match_ended",
	"game:podium_start",
	"game:match_destroyed",
	"game:replay_created",
	"game:nameplate_tick",
	"game:clock_started",
	"game:clock_stopped",
	"game:clock_updated_seconds",
	"game:round_started_go",
	"game:ball_hit",
	"sos:version",
];

function sendWsRelayEvent(
	ws: WebSocket,
	event: "wsRelay:register" | "wsRelay:unregister",
	data: string | symbol | undefined
) {
	if (typeof data === "undefined") {
		for (const e of events) {
			sendWsRelayEvent(ws, event, e);
		}
	} else {
		ws.send(
			JSON.stringify({
				event,
				data,
			})
		);
	}
}

/**
 * Connect to the WebSocket server at the specified port and wrap it in a typed `Emittery`
 * @param port Port to connect to the relay server at, defaults to `49322`
 * @param hostname Hostname to connect to the relay server at, defaults to `"localhost"`
 */
export default function wrap(
	port: number = 49322,
	hostname: string = "localhost"
): Promise<Emittery.Typed<EventDataMap>> {
	const emitter = new Emittery.Typed<EventDataMap>();
	const ws = new WebSocket(`ws://${hostname}:${port}`);

	(emitter as Emittery).on(Emittery.listenerAdded, ({ eventName }) =>
		sendWsRelayEvent(ws, "wsRelay:register", eventName)
	);
	(emitter as Emittery).on(Emittery.listenerRemoved, ({ eventName }) =>
		sendWsRelayEvent(ws, "wsRelay:unregister", eventName)
	);

	ws.onmessage = ({ data: buffer }) => {
		const {
			data,
			event,
		}: { data: unknown; event: keyof EventDataMap } = JSON.parse(
			buffer.toString()
		);
		emitter.emit(event, data as EventDataMap[typeof event]);
	};

	return new Promise((resolve, reject) => {
		ws.onopen = () => resolve(emitter);
		ws.onerror = (err) => reject(err);
	});
}
