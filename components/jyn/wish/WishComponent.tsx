"use client";
import { Data, fetchData } from "@/app/main/data/data";
import { useState, useEffect } from "react";

const WishComponent = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isWish, setIsWish] = useState<boolean | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    loadData();
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 isWish와 id 값을 가져옵니다.
    const storedIsWish = localStorage.getItem("isWish");
    const storedId = localStorage.getItem("id");

    if (storedIsWish !== null) {
      setIsWish(storedIsWish === "true"); // 문자열을 boolean으로 변환
    }
    if (storedId !== null) {
      setId(storedId);
    }
  }, []);
  const wishData = data.filter((v) => {
    v.id == id;
    return v;
  });
  return (
    <div>
      <h1>내 소원 목록</h1>
      <p>isWish: {isWish !== null ? isWish.toString() : "값이 없습니다."}</p>
      <p>id: {id !== null ? id : "값이 없습니다."}</p>
      {wishData.map((v) => {
        return (
          <li>
            <div>{}</div>
          </li>
        );
      })}
    </div>
  );
};

export default WishComponent;
