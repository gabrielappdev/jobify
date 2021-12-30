import { render, screen } from "@testing-library/react";
import JobCard from "../../../src/components/JobCard";
import mock from "../../../__mocks__/jobCardMock";
import moment from "moment";

global.matchMedia = () => ({ matches: true });
describe("JobCard", () => {
  it("renders the title correctly", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const card = getByTestId("job-card");

    expect(card.querySelector("h6")).toHaveTextContent(mock.title);
  });
  it("renders the company name correctly", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const companyName = getByTestId("job-card-company-name");

    expect(companyName).toHaveTextContent(mock.company.name);
  });
  it("renders the company name correctly", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const categories = getByTestId("job-card-categories");

    expect(categories).toHaveTextContent("Front-end,Back-end");
  });
  it("renders the company location correctly", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const categories = getByTestId("job-card-location");

    expect(categories).toHaveTextContent(mock.company.location);
  });
  it("if has the settings to display the logo, it should render it", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const companyLogo = getByTestId("job-card-company-logo");

    expect(companyLogo).toBeInTheDocument();
  });
  it("in the same way, if hasn`t the settings to display the logo, it shouldn`t render it", () => {
    const { queryByTestId } = render(
      <JobCard
        data={{
          ...mock,
          shouldDisplayLogo: false,
        }}
      />
    );

    const companyLogo = queryByTestId("job-card-company-logo");

    expect(companyLogo).toBeFalsy();
  });
  it("if it has the settings to be highlighted, it should be", () => {
    const { queryByLabelText } = render(<JobCard data={mock} />);

    expect(queryByLabelText("normal")).toBeFalsy();
    expect(queryByLabelText("highlighted")).toBeTruthy();
  });
  it("if it hasn`t the settings to be highlighted, it shouldn`t be", () => {
    const { queryByLabelText } = render(
      <JobCard data={{ ...mock, isHighlighted: false }} />
    );

    expect(queryByLabelText("normal")).toBeTruthy();
    expect(queryByLabelText("highlighted")).toBeFalsy();
  });
  it("if it was created until 4 hous ago, it should render the `new` adornment", () => {
    const { getByTestId } = render(
      <JobCard
        data={{ ...mock, createdAt: moment().subtract(1, "hour").toDate() }}
      />
    );

    const newCard = getByTestId("job-card-new");

    expect(newCard).toBeInTheDocument();
  });
  it("if it was created before 4 hous ago, it should render the `new` adornment", () => {
    const { queryByTestId } = render(
      <JobCard
        data={{ ...mock, createdAt: moment().subtract(5, "hour").toDate() }}
      />
    );

    const newCard = queryByTestId("job-card-new");

    expect(newCard).toBeFalsy();
  });
  it("if it has the isPinned prop, it should render the `pin` adornment", () => {
    const { getByTestId } = render(<JobCard data={mock} />);

    const newCard = getByTestId("job-card-pinned");

    expect(newCard).toBeInTheDocument();
  });
  it("if it has the isPinned prop, it should render the `pin` adornment", () => {
    const { queryByTestId } = render(
      <JobCard data={{ ...mock, isPinned: false }} />
    );

    const newCard = queryByTestId("job-card-pinned");

    expect(newCard).toBeFalsy();
  });
});
