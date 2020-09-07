# `@zipsesports/sos-wrapper`

Typed isomorphic wrapper for the Rocket League SOS Overlay System project suite

## Background

We're interested in the [SOS Overlay System](https://gitlab.com/bakkesplugins/sos) plugin for [Bakke's Mod](https://bakkesmod.com/), a mod for esports title [Rocket League](https://www.rocketleague.com/). We wrote this package to make developing against the [WebSocket interface](https://gitlab.com/bakkesplugins/sos/sos-plugin)'s [rebroadcasting relay](https://gitlab.com/bakkesplugins/sos/sos-ws-relay) easier.

## Install

```
npm install @zipsesports/sos-wrapper
```

## Usage

See [`test.ts`](test.ts).

## API

```typescript
import Emittery from "emittery";

/**
 * Stolen straight from the README: https://gitlab.com/bakkesplugins/sos/sos-plugin/-/blob/4d815d9ebc582cfeeedd22db8cdfcf2c56e8c216/README.md
 */
declare type EventDataMap = {
	"wsRelay:info": string;
	"game:update_state": {
		/* ... */
	};
	/* ... */
};

/**
 * Connect to the WebSocket server at the specified port and wrap it in a typed `Emittery`
 * @param port Port to connect to the relay server at, defaults to `49322`
 */
export default function wrap(
	port?: number
): Promise<Emittery.Typed<EventDataMap>>;
```

## License

MIT License, see [`LICENSE`](LICENSE).
