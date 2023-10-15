import styles from "../styles/components/PokedexCard.module.css";
import { Link } from "react-router-dom";

type PokedexCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  pokedexNumber: number;
};
export default function PokedexCard({
  id,
  name,
  imageUrl,
  pokedexNumber,
}: PokedexCardProps) {
  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <>
      <div key={id} className={styles.card}>
        <img src={imageUrl} alt={name}></img>
        <p className={styles["pokemon-name"]}>{capitalize(name)}</p>
        <Link to={`pokemon/${id}`}>ID {id}</Link>
      </div>
    </>
  );
}
