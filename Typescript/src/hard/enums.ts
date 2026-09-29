export enum SeatPosition {
  Window = "Window",
  Middle = "Middle",
  Aisle = "Aisle"
}

export function getSeatDescription(position: SeatPosition): string {
  switch (position) {
    case SeatPosition.Window:
      return "You have selected a window seat.";

    case SeatPosition.Middle:
      return "You have selected a middle seat.";

    case SeatPosition.Aisle:
      return "You have selected an aisle seat.";

    default:
      throw new Error("Invalid seat position");
  }
}