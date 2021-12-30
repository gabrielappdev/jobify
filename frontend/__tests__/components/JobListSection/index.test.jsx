import { render } from "@testing-library/react";
import JobListSection from "../../../src/components/JobListSection";
import mock from "../../../__mocks__/jobListSectionMock";

global.matchMedia = () => ({ matches: true });

describe("JobListSection", () => {
  it("renders the heading correctly", () => {
    const { getByRole } = render(
      <JobListSection jobList={mock} heading="test" description="description" />
    );

    expect(getByRole("heading", { level: 2 })).toHaveTextContent("test");
  });
  it("renders the description correctly", () => {
    const { getByRole } = render(
      <JobListSection jobList={mock} heading="test" description="description" />
    );

    expect(getByRole("description")).toHaveTextContent("description");
  });
  it("renders the description correctly", () => {
    const { queryAllByTestId } = render(
      <JobListSection jobList={mock} heading="test" description="description" />
    );

    expect(queryAllByTestId("job-card").length).toBe(5);
  });
});
