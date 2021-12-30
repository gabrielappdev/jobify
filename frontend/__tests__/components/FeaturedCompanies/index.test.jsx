import { render, screen } from "@testing-library/react";
import FeaturedCompanies from "../../../src/components/FeaturedCompanies";
import mock from "../../../__mocks__/featuredCompaniesMock";

global.matchMedia = () => ({ matches: true });

describe("Featured Companies", () => {
  it("renders all companies correctly", () => {
    const { queryAllByRole } = render(<FeaturedCompanies data={mock} />);

    const partners = queryAllByRole("partner");

    expect(partners.length).toBe(5);
  });
  it("render company name correctly", () => {
    const { queryAllByRole } = render(<FeaturedCompanies data={mock} />);

    const companyName = queryAllByRole("name")[0];

    expect(companyName).toHaveTextContent(mock[0].name);
  });
  it("render company posts correctly", () => {
    const { queryAllByRole } = render(<FeaturedCompanies data={mock} />);

    const companyName = queryAllByRole("posts")[0];

    expect(companyName).toHaveTextContent(mock[0].posts);
  });
});
