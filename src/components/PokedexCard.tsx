import styles from "../styles/components/PokedexCard.module.css";
type PokedexCardProps = {
  name: string;
  imageUrl: string;
  pokedexNumber: string;
};
export default function PokedexCard({
  name,
  imageUrl,
  pokedexNumber,
}: PokedexCardProps) {
  return (
    <>
      <div className={styles.card}>
        <img src={imageUrl} alt={name}></img>
        {`${name} #${pokedexNumber}`}
      </div>
    </>
  );
}
