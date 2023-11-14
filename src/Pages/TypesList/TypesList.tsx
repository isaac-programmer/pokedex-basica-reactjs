import { Link } from "react-router-dom";
import { getPokemonsType } from "../../services";

export default function TypesList({ types, pokes }: any) {
  return (
    <>
      {types?.map((type: any, index: number) => {
        return (
          <li key={index}>
            <Link
              className={`type ${type.name}`}
              to={`/${type.name}`}
              onClick={() => {
                getPokemonsType(
                  inserirNomeTipo(type.name, types),
                  pokes.funcao
                );
              }}
            >
              {type.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}

function inserirNomeTipo(name: string, types: any) {
  for (let i = 0; i < types.length; i++) {
    if (name === types[i].name) {
      return types[i].pokemon;
    }
  }
}
