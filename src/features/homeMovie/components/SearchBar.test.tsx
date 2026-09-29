// Feature: Cercador de pel·lícules

//   Scenario: Es mostra el cercador buit
//     Given el cercador té el valor ""
//     When es renderitza el component
//     Then veig un camp de cerca amb el text d'ajuda "Buscar peliculas"

//   Scenario: Es mostra el valor rebut
//     Given el cercador té el valor "matrix"
//     When es renderitza el component
//     Then el camp de cerca mostra "matrix"

//   Scenario: L'usuari escriu una cerca
//     Given el cercador està buit
//     When l'usuari escriu "matrix"
//     Then s'avisa del canvi amb el valor "matrix"

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Wrapper({ onchange }: { onchange: (v: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <SearchBar
      value={value}
      onChange={(v) => {
        setValue(v);
        onchange(v);
      }}
    />
  );
}

describe("Feature: Movie search engine", () => {
    /**
       Scenario: The search bar is displayed empty
        Given the search bar has the value ""
        When the component renders
        Then I see a search field with the placeholder text "Search for movies" */

  it("displays the empty search bar with the placeholder", () => {    
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByRole("searchbox", { name: /buscar peliculas/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Buscar peliculas");
  });

  /**
     Scenario: The received value is displayed
      Given the search input has the value "matrix"
      When the component is rendered
      Then the search field displays "matrix"
  */

  it("displays the value received via props", () => {
    render(<SearchBar value="matrix" onChange={() => {}} />);

    expect(screen.getByRole("searchbox")).toHaveValue("matrix");
  });

  
    /**
      Scenario: The user types a search query
       Given the search bar is empty
       When the user types "matrix"
       Then the change is notified with the value "matrix"
  */

  it("calls onChange with the value entered by the user", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Wrapper onchange={onChange} />);

    await user.type(screen.getByRole("searchbox"), "matrix");

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(onChange).toHaveBeenCalledWith("matrix");
    expect(screen.getByRole("searchbox")).toHaveValue("matrix");
  });
});
