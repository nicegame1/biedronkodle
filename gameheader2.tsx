import GameHeader from "../GameHeader";

export default function GameHeaderExample() {
  return (
    <GameHeader
      score={3}
      onNewGame={() => console.log("New game started")}
    />
  );
}
