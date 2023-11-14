import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TypesList from "../TypesList";
import "./styles/style.scss";
import { getPokemons, getTypes } from "../../services";

export default function HomePage() {
  const [tipos, setTipos] = useState<any[]>([]);
  const [pagina, setPagina] = useState<number>(0);
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    getPokemons(`/pokemon?limit=15&offset=${pagina}`, setPokemons, pagina);
    getTypes("type", setTipos);
  }, [pagina]);

  return (
    <section id="conteudo">
      <Grid container>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <h1>Pokemons</h1>

          <ul className="types-list">
            <TypesList
              types={tipos}
              pokes={{ pokes: pokemons, funcao: setPokemons }}
            />
          </ul>

          <section className="cards">
            <Grid container spacing={4}>
              {pokemons.map((pokemon: any, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card className="card">
                    <div className="item">
                      <div className="idPokemon">
                        <span>0{pokemon.id}</span>
                      </div>

                      <CardMedia
                        component="img"
                        sx={{
                          width: "150px",
                          height: "150px",
                          marginTop: "16px",
                          backgroundPosition: "center",
                          backgroundColor: "#4EA654",
                          boxShadow: "1px 1px 1px 2px #000000",
                          borderRadius: "5px",
                        }}
                        image={pokemon.sprites.front_default}
                        alt="Imagem do pokemon"
                      />

                      <CardContent className="content">
                        <h2>{pokemon.name}</h2>
                        <p>
                          {pokemon.types.map((type: any, index: number) => {
                            return (
                              <span
                                className={`type ${type.type.name}`}
                                key={index}
                              >
                                {type.type.name}
                              </span>
                            );
                          })}
                        </p>
                      </CardContent>

                      <CardActions className="icons">
                        <IconButton
                          aria-label="Add to favorites"
                          style={{ color: "#0d0d0d" }}
                          onClick={(event) => {
                            verificarOpcoes(pokemon.name, event, pokemon.id);
                          }}
                        >
                          <FavoriteIcon className="icon" />
                        </IconButton>

                        <Link className="link" to={`/pokemon/${pokemon.id}/`}>
                          <IconButton
                            aria-label="Add to favorites"
                            style={{ color: "#0d0d0d" }}
                          >
                            <AddBoxIcon className="icon" />
                          </IconButton>
                        </Link>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </section>

          <div className="pagination-buttons">
            <button
              className="button"
              onClick={() => {
                setPagina(pagina - 15);
                getPokemons(
                  `/pokemon?limit=15&offset=${pagina}`,
                  setPokemons,
                  pagina
                );
              }}
            >
              Anterior
            </button>

            <button
              className="button"
              onClick={() => {
                setPagina(pagina + 15);
                getPokemons(
                  `/pokemon?limit=15&offset=${pagina}`,
                  setPokemons,
                  pagina
                );
              }}
            >
              Próximo
            </button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

function verificarOpcoes(nome: any, event: any, idPokemon: any) {
  if (localStorage.getItem(`pokemon_favorito_${idPokemon}`)) {
    localStorage.removeItem(`pokemon_favorito_${idPokemon}`);
    event.target.style.color = "#0D0D0D";
  } else {
    localStorage.setItem(`pokemon_favorito_${idPokemon}`, nome);
    event.target.style.color = "#DC0A2D";
  }
}
