import style from "./Card.module.css";

export const Card = ({ name, github, englishName }) => {
  return (
    <div className={style.card}>
      <p>{name}</p>
      <p>깃허브: {github}</p>
      <p>영문이름: {englishName}</p>
    </div>
  );
};
