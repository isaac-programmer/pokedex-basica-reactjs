import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPoke, getTypes } from '../api/api';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import "./estilos/style.css";
import "./estilos/colorTypes.css";
import ListaDeTipos from '../ListaDeTipos/ListaDeTipos';

export default function HomePage() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [pagina, setPagina] = useState<number>(0);


  useEffect(() => {
    getPoke(`/pokemon?limit=15&offset=${pagina}`, setPokemons, pagina);
    getTypes('type', setTipos);
  }, [pagina]);

  return (
    <section id="conteudo">
      <Grid container>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <h1>Lista de pokemons</h1>

          <ul className='listaTypes'>
            <ListaDeTipos tipos={tipos} pokes={{ pokes: pokemons, funcao: setPokemons }} />
          </ul>

          <ul className="listaCards">
            <Grid container spacing={4}>

              {pokemons.map((pokemon, index) => (
                <Grid item xs={12} md={4} key={index}>

                  <Card style={{
                    boxShadow: '1px 1px 1px 2px #000000',
                    backgroundColor: '#29A5F2',
                    padding: '20px'
                  }}>
                    <li className="itemCard">
                      <div className="idPokemon">
                        <span>0{pokemon.id}</span>
                      </div>

                      <CardMedia
                        component="img"
                        sx={{
                          width: '150px',
                          height: '150px',
                          marginTop: '16px',
                          backgroundPosition: 'center',
                          backgroundColor: '#4EA654',
                          boxShadow: '1px 1px 1px 2px #000000',
                          borderRadius: '5px'
                        }}
                        image={pokemon.sprites.front_default}
                        alt="Imagem do pokemon"
                      />

                      <CardContent className="itemCard__conteudo">
                        <h2>{pokemon.name}</h2>
                        <p>
                          {
                            pokemon.types.map((type, index) => {
                              return (
                                <span
                                  className={`tipo ${type.type.name}`}
                                  key={index}>
                                  {type.type.name}
                                </span>
                              )
                            })
                          }
                        </p>
                      </CardContent>

                      <CardActions className="itemCard__icones">
                        <IconButton aria-label="Add to favorites" style={{ color: '#0d0d0d' }} onClick={(event) => {
                          verificarOpcoes(pokemon.name, event, pokemon.id);
                        }}>
                          <FavoriteIcon className="icone" />
                        </IconButton>

                        <Link className="link" to={`/pokemon/${pokemon.id}/`}>
                          <IconButton aria-label="Add to favorites" style={{ color: '#0d0d0d' }}>
                            <AddBoxIcon className="icone" />
                          </IconButton>
                        </Link>
                      </CardActions>
                    </li>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </ul>
          <button className="botao" onClick={() => {
            setPagina(pagina - 15)
            getPoke(`/pokemon?limit=15&offset=${pagina}`,
              setPokemons,
              pagina
            )
          }} >vinda</button>
          <button className="botao" onClick={() => {
            setPagina(pagina + 15)
            getPoke(`/pokemon?limit=15&offset=${pagina}`,
              setPokemons,
              pagina
            )
          }} >ida</button>
        </Grid>
      </Grid >
    </section>
  );
}

function verificarOpcoes(nome, event, idPokemon) {
  if (localStorage.getItem(`pokemon_favorito_${idPokemon}`)) {
    localStorage.removeItem(`pokemon_favorito_${idPokemon}`)
    event.target.style.color = '#0D0D0D';
  } else {
    localStorage.setItem(`pokemon_favorito_${idPokemon}`, nome);
    event.target.style.color = '#DC0A2D';
  }
}