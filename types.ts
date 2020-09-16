export type TeamName = string;
export type TeamNumber = 0 | 1;

/**
 * From [`GameState.cpp`](https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/9f2b414bd14b8565dff502825b4de3c73ffd1807/SOS/GameState.cpp#L60):
 * ```cpp
 * PRI.GetPlayerName().IsNull() ? "" : PRI.GetPlayerName().ToString();
 * ```
 */
export type PlayerName = string;
/**
 * From [`GameState.cpp`](https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/9f2b414bd14b8565dff502825b4de3c73ffd1807/SOS/GameState.cpp#L61):
 * ```cpp
 * name + '_' + std::to_string(PRI.GetSpectatorShortcut());
 * ```
 */
export type PlayerID = string;
export type BasePlayer = {
	/**
	 * Player name
	 */
	name: PlayerName;
	/**
	 * Player ID in game (do not use in other platforms like Steam)
	 */
	id: PlayerID;
};

/**
 * From the README: https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/4d815d9ebc582cfeeedd22db8cdfcf2c56e8c216/README.md
 */
export type EventDataMap = {
	"wsRelay:info": "Connected!";
	"game:update_state": {
		event: "gamestate";
		game: {
			/**
			 * Ball speed in km/h
			 */
			ballSpeed: number;
			/**
			 * Team number of player who last touched the ball
			 */
			ballTeam: number;
			/**
			 * X coordinate of ball
			 */
			ballX: number;
			/**
			 * Y coordinate of ball
			 */
			ballY: number;
			/**
			 * Z coordinate of ball
			 */
			ballZ: number;
			/**
			 * If camera view has target
			 */
			hasTarget: boolean;
			/**
			 * Whether or not the game has been won
			 */
			hasWinner: boolean;
			/**
			 * Whether or not the game is in overtime
			 */
			isOT: boolean;
			/**
			 * Whether or not the game is currently showing a replay
			 */
			isReplay: boolean;
			/**
			 * Camera view target (is a player `id`)
			 */
			target: PlayerID;
			/**
			 * Map of `TeamNumber`s to `TeamName`s and their team's score
			 */
			teams: Record<
				TeamNumber,
				{
					/**
					 * Team name
					 */
					name: TeamName;
					/**
					 * Score of team
					 */
					score: number;
				}
			>;
			time: number;
			/**
			 * `name` of winning team
			 */
			winner: TeamName;
		};
		hasGame: boolean;
		/**
		 * Map of `PlayerID`s to data about the corresponding player
		 */
		players: Record<
			PlayerID,
			BasePlayer & {
				/**
				 * Number of assists the player has
				 */
				assists: number;
				/**
				 * Attacker if player was demolished (can be `""`)
				 */
				attacker: "" | PlayerID;
				/**
				 * Percentage of boost the player has left
				 */
				boost: number;
				/**
				 * Number of times the player has touched another car
				 */
				cartouches: number;
				/**
				 * Number of times the player has demolished another car
				 */
				demos: number;
				/**
				 * Number of goals the player has scored
				 */
				goals: number;
				/**
				 * Whether or not the player currently has a car (hasn't loaded in yet? not related to isDead?)
				 */
				hasCar: boolean;
				/**
				 * Whether or not the player is currently dead (not related to hasCar?)
				 */
				isDead: boolean;
				/**
				 * Whether or not the player is going supersonic
				 */
				isSonic: boolean;
				/**
				 * Platform-specific player ID e.g. SteamID
				 */
				primaryID: number;
				/**
				 * Number of saves the player has made
				 */
				saves: number;
				/**
				 * The player's score
				 */
				score: number;
				/**
				 * Number of shots on goal the player has made
				 */
				shots: number;
				/**
				 * Speed of player (in km/h)
				 */
				speed: number;
				/**
				 * Unique number for the team the player is on
				 */
				team: TeamNumber;
				/**
				 * Ball touches
				 */
				touches: number;
				/**
				 * X coordinate of player
				 */
				x: number;
				/**
				 * Y coordinate of player
				 */
				y: number;
				/**
				 * Z coordinate of player
				 */
				z: number;
			}
		>;
	};
	"game:match_created": "game_match_created";
	"game:initialized": "initialized";
	"game:pre_countdown_begin": "pre_game_countdown_begin";
	"game:post_countdown_begin": "post_game_countdown_begin";
	"game:statfeed_event": {
		/**
		 * AKA receiver
		 */
		main_target: BasePlayer;
		/**
		 * AKA victim
		 */
		secondary_target: BasePlayer;
		/**
		 * e.g. `"Goal"`
		 */
		type: string;
	};
	"game:goal_scored": {
		/**
		 * Speed of the ball as it went into the goal (in km/h?)
		 */
		goalspeed: number;
		/**
		 * Player who scored the goal
		 */
		scorer: BasePlayer;
		/**
		 * Data about the last
		 */
		ball_last_touch: {
			/**
			 * `PlayerID` of the player who last touched the ball
			 */
			player: PlayerID;
			/**
			 * Speed of player when they last touched the ball?
			 */
			speed: number;
		};
	};
	"game:replay_start": "game_replay_start";
	"game:replay_will_end": "game_replay_will_end";
	"game:replay_end": "game_replay_end";
	"game:match_ended": {
		/**
		 * Winning team number
		 */
		winner_team_num: TeamNumber;
	};
	"game:podium_start": "game_podium_start";
};
