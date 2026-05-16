import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const getUserProfile = async (userId: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/${userId}`,
  );
  return response.data.data;
};

function App() {
  const [inputValue, setInputValue] = useState("15");

  const [userId, setUserId] = useState(15);

  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId),
    enabled: shouldFetch,
  });

  const handleFetch = () => {
    if (!inputValue.trim()) return;
    const parsed = Number(inputValue);
    if (Number.isNaN(parsed)) return;
    setUserId(parsed);
    setShouldFetch(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <h1>유저 프로필</h1>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShouldFetch(false);
        }}
        placeholder="사용자 ID"
      />
      <button onClick={handleFetch}>데이터 가져오기</button>
      {(isPending || isFetching) && shouldFetch && <div>로딩 중...</div>}
      {isError && <div>에러: {error.message}</div>}
      {data && (
        <div>
          <h2>id: {data.loginId}</h2>
          <p>name: {data.name}</p>
          <p>email: {data.email}</p>
          <p>age: {data.age}</p>
          <p>part: {data.part}</p>
        </div>
      )}
    </div>
  );
}

export default App;
