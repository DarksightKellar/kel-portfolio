import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Navbar from "./Navbar";

describe("Navbar theme toggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.classList.remove("dark");
  });

  it("defaults to dark theme and exposes a light-mode switch action", () => {
    render(<Navbar />);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(
      screen.getByRole("button", { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });

  it("switches between dark and light modes", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(
      screen.getByRole("button", { name: /switch to light mode/i }),
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /switch to dark mode/i }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(
      screen.getByRole("button", { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });
});
