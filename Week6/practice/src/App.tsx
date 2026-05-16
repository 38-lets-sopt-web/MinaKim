import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const USER_ID = 40;

type UpdateUserPayload = {
  name?: string;
  email?: string;
  age?: number;
};

const getUserProfile = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/${id}`,
  );
  return response.data.data;
};

const updateUserProfile = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateUserPayload;
}) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/users/${id}`,
    payload,
  );
  return response.data.data;
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profile", USER_ID],
    queryFn: () => getUserProfile(USER_ID),
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      updateUserProfile({ id: USER_ID, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", USER_ID] });

      setName("");
      setEmail("");
      setAge("");
    },
  });

  const buildPayload = (): UpdateUserPayload => {
    const payload: UpdateUserPayload = {};

    if (name.trim()) payload.name = name.trim();
    if (email.trim()) payload.email = email.trim();
    if (age !== "") payload.age = Number(age);

    return payload;
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <h1>내 프로필</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data && (
          <>
            <p>name: {data.name}</p>
            <p>email: {data.email}</p>
            <p>age: {data.age}</p>
            <p>part: {data.part}</p>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="새 이름"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="새 이메일"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="새 나이"
        />
        <button onClick={() => mutate(buildPayload())} disabled={isMutating}>
          {isMutating ? "수정 중..." : "프로필 수정"}
        </button>
      </div>
    </div>
  );
}

export default App;
