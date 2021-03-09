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
export type OnlyMatchGUID = {
	/**
	 * Match GUID
	 */
	match_guid: string;
};
export type XY = {
	/**
	 * X coordinate
	 */
	X: number;
	/**
	 * Y coordinate
	 */
	Y: number;
};
export type XYZ = XY & {
	/**
	 * Z coordinate
	 */
	Z: number;
};
export type Rotation = {
	/**
	 * Pitch
	 */
	pitch: number;
	/**
	 * Roll
	 */
	roll: number;
	/**
	 * Yaw
	 */
	yaw: number;
};
export type NameplateStatus = {
	/**
	 * Whether or not the nameplate is visible
	 */
	isvisible: boolean;
	/**
	 * Position of the nameplate
	 */
	position: {
		/**
		 * X coordinate of nameplate
		 */
		x: number;
		/**
		 * Y coordinate of nameplate
		 */
		y: number;
		/**
		 * Depth of nameplate
		 */
		depth: number;
	};
};

/**
 * From the README: https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/4d815d9ebc582cfeeedd22db8cdfcf2c56e8c216/README.md
 */
export type EventDataMap = {
	"wsRelay:info": "Connected!";
	"game:update_state": OnlyMatchGUID & {
		event: string;
		game: {
			/**
			 * Arena
			 */
			arena: string;
			/**
			 * Ball information
			 */
			ball: {
				/**
				 * Ball location
				 */
				location: XYZ;
				/**
				 * Ball speed
				 */
				speed: number;
				/**
				 * Ball possession
				 */
				team: TeamNumber;
			};
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
					/**
					 * Team's primary color (as a hex code)
					 */
					color_primary: string;
					/**
					 * Team's secondary color (as a hex code)
					 */
					color_secondary: string;
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
				 * Whether or not the player is powersliding
				 */
				isPowersliding: boolean;
				/**
				 * Whether or not the player is going supersonic
				 */
				isSonic: boolean;
				/**
				 * The players location and rotation
				 */
				location: XYZ & Rotation;
				/**
				 * Whether or not the player is on the ground
				 */
				onGround: boolean;
				/**
				 * Whether or not the player is on the wall
				 */
				onWall: boolean;
				/**
				 * Platform-specific player ID e.g. SteamID
				 */
				primaryID: string;
				/**
				 * Number of saves the player has made
				 */
				saves: number;
				/**
				 * The player's score
				 */
				score: number;
				/**
				 * Spectator shortcut key
				 */
				shortcut: number;
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
			}
		>;
	};
	"game:match_created": OnlyMatchGUID;
	"game:initialized": OnlyMatchGUID;
	"game:pre_countdown_begin": OnlyMatchGUID;
	"game:post_countdown_begin": OnlyMatchGUID;
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
		 * Time of goal
		 */
		goaltime: number;
		/**
		 * Impact location of goal
		 */
		impact_location: XY;
		/**
		 * Player who scored the goal
		 */
		scorer: BasePlayer & {
			teamnum: TeamNumber;
		};
		/**
		 * Player assisting with goal
		 */
		assister: BasePlayer;
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
	"game:replay_start": OnlyMatchGUID;
	"game:replay_will_end": OnlyMatchGUID;
	"game:replay_end": OnlyMatchGUID;
	"game:match_ended": OnlyMatchGUID & {
		/**
		 * Winning team number
		 */
		winner_team_num: TeamNumber;
	};
	"game:podium_start": OnlyMatchGUID;
	"game:clock_started": OnlyMatchGUID;
	"game:clock_stopped": OnlyMatchGUID;
	"game:clock_updated_seconds": OnlyMatchGUID;
	"game:round_started_go": "game_round_started_go";
	"game:ball_hit": OnlyMatchGUID & {
		/**
		 * Player that hit the ball
		 */
		player: BasePlayer;
		/**
		 * Ball speed (before and after hit) and location
		 */
		ball: {
			/**
			 * Ball speed before being hit
			 */
			pre_hit_speed: number;
			/**
			 * Ball location
			 */
			location: XYZ;
			/**
			 * Ball speed after being hit
			 */
			post_hit_speed: number;
		};
	};
	"game:match_destroyed": OnlyMatchGUID;
	"game:replay_created": OnlyMatchGUID;
	"game:nameplate_tick": OnlyMatchGUID & {
		nameplates: {
			/**
			 * Data about the ball nameplate
			 */
			ball: NameplateStatus & {
				/**
				 * Ball nameplate radius
				 */
				radius: number;
			};
			/**
			 * Map of `PlayerID`s to data about the corresponding player's nameplate
			 */
			players: Record<
				PlayerID,
				NameplateStatus & {
					/**
					 * Player nameplate scale
					 */
					scale: number;
				}
			>;
		};
	};
	"sos:version": string;
};
