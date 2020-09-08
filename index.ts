import Emittery from "emittery";
import WebSocket from "isomorphic-ws";

/**
 * Stolen straight from the README: https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/4d815d9ebc582cfeeedd22db8cdfcf2c56e8c216/README.md
 */
type EventDataMap = {
	"wsRelay:info": string;
	"game:update_state": {
		event: string;
		game: {
			ballSpeed: number;
			ballTeam: number;
			hasTarget: boolean;
			hasWinner: boolean;
			isOT: boolean;
			isReplay: boolean;
			target: string;
			teams: {
				0: {
					name: string;
					score: number;
				};
				1: {
					name: string;
					score: number;
				};
			};
			time: number;
			winner: string;
		};
		hasGame: boolean;
		players: Record<
			string,
			{
				assists: number;
				attacker: string;
				boost: number;
				cartouches: number;
				goals: number;
				hasCar: boolean;
				id: string;
				isDead: boolean;
				isSonic: boolean;
				name: string;
				/**
				 * Platform-specific player ID e.g. SteamID
				 */
				primaryID: number;
				saves: number;
				score: number;
				shots: number;
				speed: number;
				team: number;
				touches: number;
			}
		>;
	};
	"game:match_created": string;
	"game:initialized": string;
	"game:pre_countdown_begin": string;
	"game:post_countdown_begin": string;
	"game:statfeed_event": {
		main_target: string;
		secondary_target: string;
		type: string;
	};
	"game:goal_scored": string;
	"game:replay_start": string;
	"game:replay_will_end": string;
	"game:replay_end": string;
	"game:match_ended": {
		winner_team_num: number;
	};
	"game:podium_start": string;
};

/**
 * Connect to the WebSocket server at the specified port and wrap it in a typed `Emittery`
 * @param port Port to connect to the relay server at, defaults to `49322`
 */
export default function wrap(
	port: number = 49322
): Promise<Emittery.Typed<EventDataMap>> {
	const emitter = new Emittery.Typed<EventDataMap>();
	const ws = new WebSocket(`ws://localhost:${port}`);

	(emitter as Emittery).on(Emittery.listenerAdded, ({ eventName: data }) => {
		ws.send(
			JSON.stringify({
				event: "wsRelay:register",
				data,
			})
		);
	});

	ws.onmessage = ({ data: json }) => {
		const {
			data,
			event,
		}: { data: unknown; event: keyof EventDataMap } = JSON.parse(
			json.toString()
		);
		emitter.emit(event, data as EventDataMap[typeof event]);
	};

	return new Promise((resolve, reject) => {
		ws.onopen = () => resolve(emitter);
		ws.onerror = (err) => reject(err);
	});
}
