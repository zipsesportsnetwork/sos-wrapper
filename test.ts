import wrap from ".";

(async () => {
	const emitter = await wrap();

	emitter.on("game:update_state", (state) => console.log(state.game.time));
	emitter.on("game:statfeed_event", (stat) => console.log(stat.type));
})();
