import {
  render,
  act,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import Navigation from "../../../src/components/Navigation";
import mock from "../../../__mocks__/navigationProps";

describe("Navigation", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Navigation data={mock} />);

    const navigation = getByTestId("navigation");

    expect(navigation).toBeInTheDocument();
  });
  it("is placed correctly", () => {
    const { getByTestId } = render(<Navigation data={mock} />);

    const navigation = getByTestId("navigation");

    expect(navigation).toHaveStyle("position: fixed");
    expect(navigation).toHaveStyle("top: 0");
    expect(navigation).toHaveStyle("left: 0");
  });
  it("has a home link", () => {
    const { getByTestId } = render(<Navigation data={mock} />);

    const navigationHomeImage =
      getByTestId("navigation-home").querySelector("img");

    expect(navigationHomeImage).toBeInTheDocument();
  });
  it("render a list of categories when its button is clicked", async () => {
    const { getByTestId } = render(<Navigation data={mock} />);

    const navigationCategories = getByTestId("navigation-categories");

    act(() => {
      fireEvent.click(navigationCategories);
    });

    await waitFor(() => {
      const menu = screen.getByRole("menu");
      const menuItems = menu.querySelectorAll('[role="menuitem"]');
      expect(menu).toBeInTheDocument();
      expect(menuItems.length).toBe(2);
    });
  });
  it("renders correctly the post job button", () => {
    const { getByTestId } = render(<Navigation data={mock} />);

    const navigationPostJobButton = getByTestId("navigation-post-job");

    expect(navigationPostJobButton).toBeInTheDocument();
  });
});
