import Image from "next/image";
import { Network } from "./Network";
import { site } from "@/lib/content";

export function Hero() {
  return (
    <header id="hero">
      <Network />
      <div className="wrap hero-in" id="top">
        <div>
          <div className="mono">Software engineer · {site.location}</div>
          <h1>
            <span><i>Jubril</i></span>
            <span><i>Elebute</i></span>
          </h1>
          <p className="lead">
            I started in biochemistry, studying how complex systems behave. Now I’m a software engineer building products with authentication, role-based access and tests, in TypeScript, Next.js and PostgreSQL.
          </p>
          <p className="mono status"><span className="dot" />Open to full-time, internship and open-source roles</p>
          <div className="btns">
            <a className="btn p mag" href="#work">View my work</a>
            <a className="btn mag" href="#contact">Get in touch</a>
          </div>
        </div>
        <figure className="ph" style={{ margin: 0 }}>
          <div className="in">
            <Image src="/images/jubril.jpg" alt={`Portrait of ${site.name}`} width={1000} height={1333} priority sizes="(max-width: 820px) 100vw, 45vw" data-parallax />
          </div>
        </figure>
      </div>
    </header>
  );
}
