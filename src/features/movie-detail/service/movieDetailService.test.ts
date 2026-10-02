import { beforeEach, describe, expect, it, vi } from "vitest";
import { tmdbFetch } from "../../../shared/service/tmdbClient";
import {
  getMovieCredits,
  getMovieDetail,
  getMovieWithCredits,
} from "./movieDetailService";

vi.mock("../../../shared/service/tmdbClient", () => ({
  tmdbFetch: vi.fn(),
}));

const mockedTmdbFetch = vi.mocked(tmdbFetch);

describe("Movie detail service", () => {
  beforeEach(() => {
    mockedTmdbFetch.mockReset();
  });

  /**
    Scenario: The movie detail is requested
     Given the movie id "10"
     When getMovieDetail is called
     Then TMDB is asked for "/movie/10"
  */

  it("requests /movie/:id", async () => {
    mockedTmdbFetch.mockResolvedValue({ id: 10, title: "Test" });

    const result = await getMovieDetail("10");
    expect(mockedTmdbFetch).toHaveBeenCalledWith("/movie/10");
    expect(result).toEqual({ id: 10, title: "Test" });
  });

  /**
    Scenario: The movie credits are requested
     Given the movie id "10"
     When getMovieCredits is called
     Then TMDB is asked for "/movie/10/credits"
  */

  it("requests /movie/:id/credits", async () => {
    mockedTmdbFetch.mockResolvedValue({ cast: [], crew: [] });

    await getMovieCredits("10");

    expect(mockedTmdbFetch).toHaveBeenCalledWith("/movie/10/credits");
  });

  /**
    Scenario: Movie and credits are loaded together
     Given both requests succeed
     When getMovieWithCredits is called
     Then it returns the movie and its credits in a single object
  */

  it("combines the movie and its credits", async () => {
    mockedTmdbFetch.mockImplementation(async (endpoint: string) =>
      endpoint.endsWith("/credits")
        ? { cast: [], crew: [] }
        : { id: 10, title: "Car" },
    );

    const result = await getMovieWithCredits("10");

    expect(result).toEqual({
      movie: { id: 10, title: "Car" },
      credits: { cast: [], crew: [] },
    });
  });

  /**
    Scenario: One of the two requests fails
     Given the credits request fails
     When getMovieWithCredits is called
     Then the whole call fails
  */

  it("fails when one of the two requests fails", async () => {
    mockedTmdbFetch.mockImplementation(async (endpoint: string) => {
      if (endpoint.endsWith("/credits")) throw new Error("credits failed");
      return { id: 10, title: "Test" };
    });
    await expect(getMovieWithCredits("10")).rejects.toThrow("credits failed");
  });
});
