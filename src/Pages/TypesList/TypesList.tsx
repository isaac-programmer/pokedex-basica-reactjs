import { Link } from "react-router-dom";

export default function TypesList({ types, setSelectType }: any) {
  return (
    <>
      {types?.map((type: any, index: number) => {
        return (
          <li key={index}>
            <Link
              className={`type ${type.name}`}
              to={`/`}
              onClick={() => {
                setSelectType(type.name);
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
