import { beforeEach, describe, expect, it, vi } from "vitest";

import type { MovieDetail } from "../types/movieDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MovieDetailPage } from "./MovieDetailPage";
import { render, screen } from "@testing-library/react";
const { getMovieWithCreditsMock } = vi.hoisted(() => ({

  getMovieWithCreditsMock: vi.fn(),
}));

vi.mock("../service/movieDetailService", () => ({
  getMovieWithCredits: getMovieWithCreditsMock,
}));

const movie = {
  id: 603,
  title: "Matrix",
  overview: "Un hacker descubre la realidad.",
  release_date: "1999-03-31",
  runtime: 136,
  backdrop_path: null,
  poster_path: null,
  vote_average: 8.2,
} as MovieDetail;

const credits = {
  cast: [
    { id: 6384, name: "Keanu Reeves", character: "Neo", profile_path: null },
  ],
  crew: [
    { id: 9340, name: "Lana Wachowski", job: "Director", profile_path: null },
  ],
};

function renderPage() {
  render(
    <MemoryRouter initialEntries={["/movie/603"]}>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Movie detail page", () => {
  beforeEach(() => {
     getMovieWithCreditsMock.mockReset();
  });

  /**
    Scenario: The movie is loading
     Given the request has not finished yet
     When the page renders
     Then I see the loading message and no movie title
  */
  it("shows the loading state while the request is pending", () => {
      getMovieWithCreditsMock.mockReturnValue(new Promise(() => {}));

    renderPage();

    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
    expect(screen.queryByRole("heading", {name: "Matrix"})).not.toBeInTheDocument()
  });

  /**
    Scenario: The movie is displayed with its director and cast
     Given the movie and its credits load correctly
     When the page finishes loading
     Then I see the title, the director and the cast
  */

     it("shows the movie, the director and the cast on success", async () => {
  getMovieWithCreditsMock.mockResolvedValue({ movie, credits });

  renderPage();

  expect(await screen.findByRole("heading", { name: "Matrix" })).toBeInTheDocument();

  const directorLinks = screen.getAllByRole("link", { name: "Lana Wachowski" });
  directorLinks.forEach((link) => expect(link).toHaveAttribute("href", "/director/9340"));

  expect(screen.getByText("Keanu Reeves")).toBeInTheDocument();
});

     /**
    Scenario: The request uses the id from the URL
     Given I open the URL "/movie/603"
     When the page renders
     Then the service is called with "603"
  */
  it("requests the movie with the id from the route", async () => {
      getMovieWithCreditsMock.mockResolvedValue({ movie, credits });

    renderPage();
    await screen.findByRole("heading", { name: "Matrix" });

    expect(  getMovieWithCreditsMock).toHaveBeenCalledWith("603");
  });

  /**
    Scenario: The request fails
     Given the service fails with an error
     When the page finishes loading
     Then I see the error message and no movie
  */
  it("shows the error message when the request fails", async () => {
      getMovieWithCreditsMock.mockRejectedValue(new Error("boom"));

    renderPage();

 expect(await screen.findByText("boom")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Matrix" })).not.toBeInTheDocument();
  });
});
