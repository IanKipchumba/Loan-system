import { describe, expect, it } from "vitest";
import { canRequestRide, estimateFare } from "../lib/ride-logic";

describe("ride logic", () => {
  it("calculates a distance-adjusted fare by ride type", () => {
    expect(estimateFare("Standard", 0)).toBe(18);
    expect(estimateFare("Comfort", 5)).toBe(32);
    expect(estimateFare("XL", -2)).toBe(34);
  });

  it("requires a non-empty destination", () => {
    expect(canRequestRide(" Central Market ")).toBe(true);
    expect(canRequestRide("   ")).toBe(false);
  });
});
