import { render, screen } from "@testing-library/react";
import Hero from "../../../src/components/Hero";
import mock from "../../../__mocks__/homePropsMock";

describe("Hero", () => {
  it("renders correctly with the passed Image", () => {
    const { getByTestId } = render(<Hero data={mock} />);

    const heroBox = getByTestId("hero");

    expect(heroBox).toHaveStyle(`background-image: url(${mock.heroUrl})`);
  });
  it("renders correctly with the passed Heading", () => {
    const { getByRole } = render(<Hero data={mock} />);

    const heroBoxHeading = getByRole("heading", { leve: 1 });

    expect(heroBoxHeading).toHaveTextContent("Jobify");
  });
  it("renders correctly with the passed description", () => {
    const { getByTestId } = render(<Hero data={mock} />);

    const heroBoxDescription = getByTestId("hero-description");

    expect(heroBoxDescription).toHaveTextContent("Description");
  });
  it("should not display any description if its blank", () => {
    const { queryByTestId } = render(
      <Hero data={{ ...mock, description: "" }} />
    );

    const heroBoxDescription = queryByTestId("hero-description");

    expect(heroBoxDescription).toBeFalsy();
  });
  it("should render the post job button button with the correct price", () => {
    const { getByRole } = render(<Hero data={mock} />);

    const heroBoxPostJobButton = getByRole("button");

    expect(heroBoxPostJobButton).toHaveTextContent(
      `Post a job for $${mock.price}`
    );
  });
  it("should not render the post job button if the price is null or blank", () => {
    const { queryByRole } = render(<Hero data={{ ...mock, price: 0 }} />);

    const heroBoxPostJobButton = queryByRole("button");

    expect(heroBoxPostJobButton).toBeFalsy();
  });
});
