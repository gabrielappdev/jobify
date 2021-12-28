import { render, screen } from "@testing-library/react";
import Container from "../../src/components/Container";

describe("Container", () => {
  it("renders correctly a heading inside the container", () => {
    render(
      <Container>
        <h1>Container main heading</h1>
      </Container>
    );

    const heading = screen.getByRole("heading", {
      name: /Container main heading/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
