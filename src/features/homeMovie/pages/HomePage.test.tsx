import { describe, vi, beforeEach, it, expect } from "vitest";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../service/exploreService";
import type { Movie } from "../../../shared/types/movie";
import { render, screen, waitFor } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import type { MovieList } from "../types/MovieList";
import userEvent from "@testing-library/user-event";

vi.mock("../service/exploreService", () => ({
  getGenres: vi.fn(),
  getMoviesByGenre: vi.fn(),
  getPopularMovies: vi.fn(),
  searchMovies: vi.fn(),
}));

const matrix = {
  id: 1,
  title: "Matrix",
  poster_path: null,
  release_date: "1999-03-31",
  vote_average: 8.2,
} as Movie;
const killBill = {
  id: 2,
  title: "KillBill",
  poster_path: null,
  release_date: "2003-10-10",
  vote_average: 8.0,
} as Movie;

function renderPage() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe("Home Page", () => {
  beforeEach(() => {
    vi.mocked(getGenres)
      .mockReset()
      .mockResolvedValue({ genres: [{ id: 28, name: "Acción" }] } as never);
    vi.mocked(getPopularMovies)
      .mockReset()
      .mockResolvedValue({ results: [matrix, killBill] } as MovieList);
    vi.mocked(searchMovies).mockReset();
    vi.mocked(getMoviesByGenre).mockReset();
  });

  /**
    Scenario: Popular movies are shown on arrival
     Given I open the home page
     When the popular movies load
     Then I see their titles
  */

  it("shows the popular movies on load", async () => {
    renderPage();

    expect(await screen.findByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("KillBill")).toBeInTheDocument();
  });

  /**
    Scenario: The search waits until the user stops typing
     Given the home page is loaded
     When the user types "titanic" quickly
     Then no search is made while typing
     And one single search is made with "titanic" afterwards
     And I see only the results of that search
  */

  it("searches once, after the user stops typing", async () => {
    vi.mocked(searchMovies).mockResolvedValue({
      results: [killBill],
    } as MovieList);
    const user = userEvent.setup();
    renderPage();
    await screen.findByText("Matrix");

    await user.type(screen.getByRole("searchbox"), "killBill");

    expect(searchMovies).not.toHaveBeenCalled();
    await waitFor(() => expect(searchMovies).toHaveBeenCalledTimes(1));
    expect(searchMovies).toHaveBeenCalledWith("killBill");
    expect(await screen.findByText("KillBill")).toBeInTheDocument();
    expect(screen.queryByText("Matrix")).not.toBeInTheDocument();
  });

  /**
    Scenario: The search has no results
     Given the home page is loaded
     When the user searches for something that does not exist
     Then I see the "no results" message
  */

  it("shows the empty message when there are no results", async () => {
    vi.mocked(searchMovies).mockResolvedValue({
      results: [],
    } as unknown as MovieList);
    const user = userEvent.setup();
    renderPage();
    await screen.findByText("Matrix");

    await user.type(screen.getByRole("searchbox"), "zzzzz");

    expect(
      await screen.findByText(/No se han encontrado resultados/i),
    ).toBeInTheDocument();
  });

  /**
    Scenario: The movies request fails
     Given the API fails
     When the home page loads
     Then I see an error alert and no movies
  */

  it("shows an error alert when the movies request fails", async () => {
    vi.mocked(getPopularMovies).mockRejectedValue(new Error("boom"));

    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent("boom");
    expect(screen.queryByText("Matrix")).not.toBeInTheDocument();
  });

  /**
    Scenario: The genres fail to load
     Given the genres request fails
     When the home page loads
     Then I see a warning about the genres
     And the popular movies are still displayed
  */

  it("warns about the genres but keeps showing the movies", async () => {
    vi.mocked(getGenres).mockRejectedValue(new Error("boom"));

    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent(/géneros/i);
    expect(await screen.findByText("Matrix")).toBeInTheDocument();
  });
});
