import Image from "next/image";
import Link from "next/link";
import data from "./products.json";

export default function Home() {
  return (
    <div
      style={{
        border: "1px solid gray",
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {data.items.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`} passHref>
            <div
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ccc",
                padding: "10px",
                minWidth: "300px",
                cursor: "pointer",
              }}
            >
              <div
                style={{ width: "100%", height: "200px", position: "relative" }}
              >
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
