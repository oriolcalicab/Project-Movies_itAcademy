
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("TMDB client", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("VITE_TMDB_BASE_URL", "https://api.test/3");
    vi.stubEnv("VITE_TMDB_API_KEY", "test-key");
    vi.resetModules();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() =>{
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  })
  

   /**
    Scenario: The request URL is built correctly
     Given a search endpoint with the params query "matrix" and page "2"
     When tmdbFetch is called
     Then the URL contains the endpoint, api_key, language es-ES and the params
  */
it("builds the URL with api_key, language and params", async() =>{
    fetchMock.mockResolvedValue({ok: true, json: async () => ({page: 1})})
    const { tmdbFetch } = await import("./tmdbClient")

    await tmdbFetch("/search/movie", { query: "matrix", page: "2"})

     const calledUrl = new URL(fetchMock.mock.calls[0][0]);
    expect(calledUrl.origin + calledUrl.pathname).toBe("https://api.test/3/search/movie");
    expect(calledUrl.searchParams.get("api_key")).toBe("test-key");
    expect(calledUrl.searchParams.get("language")).toBe("es-ES");
    expect(calledUrl.searchParams.get("query")).toBe("matrix");
    expect(calledUrl.searchParams.get("page")).toBe("2");
})


 /**
    Scenario: A successful response is returned
     Given TMDB answers with status 200 and a JSON body
     When tmdbFetch is called
     Then it returns the parsed JSON
  */
 it("returns the JSON when the response is ok", async () => {
    fetchMock.mockResolvedValue({ok: true, json: async () => ({id: 1})})
    const { tmdbFetch } = await import("./tmdbClient")

    await expect(tmdbFetch("/movie/1")).resolves.toEqual({ id: 1 });


 })


  /**
    Scenario: TMDB answers with an HTTP error
     Given TMDB answers with status 404
     When tmdbFetch is called
     Then it throws an error that carries the status 404
  */

     it("throws an error with the status when the response is not ok", async () =>{
        fetchMock.mockResolvedValue({ok: false, status: 404})
        const { tmdbFetch } = await import("./tmdbClient")

        await expect(tmdbFetch("/movie/999")).rejects.toMatchObject({status: 404})
     })


     /**
    Scenario: There is no network
     Given fetch fails with a network error
     When tmdbFetch is called
     Then the network error is propagated
  */ 

     it("propagates the network error when fetch fails", async () =>{
        fetchMock.mockRejectedValue(new TypeError("Faild to fetch"))
        const { tmdbFetch } = await import("./tmdbClient")

        await expect(tmdbFetch("/movie/1")).rejects.toBeInstanceOf(TypeError)
     })

});
