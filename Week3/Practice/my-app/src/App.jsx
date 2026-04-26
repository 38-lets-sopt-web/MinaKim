import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { members } from "./mocks/member";
import { useSearch } from "./hooks/useSearch";

export default function App() {
  const { search, filteredData, handleSearchChange, handleSearchClick } =
    useSearch(members);

  return (
    <section>
      <Header />
      <Search
        search={search}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
      />
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredData.map((member) => (
          <Card key={member.id} {...member} />
        ))}
      </section>
    </section>
  );
}
